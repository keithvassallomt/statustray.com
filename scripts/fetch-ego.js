import https from 'node:https';
import { writeFile } from 'node:fs/promises';

const EGO_URL = 'https://extensions.gnome.org/extension/9164/status-tray/';
const EGO_INFO_URL = 'https://extensions.gnome.org/extension-info/?pk=9164&shell_version=49';
const OUTPUT = new URL('../src/data/ego.json', import.meta.url);

const fallback = {
  gnomeShell: 'GNOME Shell 45–49',
  latestVersion: 'Unknown',
};

const stripHtml = (value) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeVersionLabel = (value) => {
  if (!value) {
    return null;
  }

  // EGO commonly formats this as "1.0 (2)" where "(2)" is the revision number.
  const cleaned = String(value).trim().replace(/\s*\(\d+\)\s*$/, '');
  return cleaned || null;
};

const isRevisionOnlyVersion = (value) => /^\d+$/.test(String(value ?? '').trim());

const extractShellVersions = (html) => {
  const normalized = html.replace(/\s+/g, ' ');
  const labelMatch = normalized.match(/GNOME Shell\s*Versions?\s*<\/dt>\s*<dd>([^<]+)<\/dd>/i);
  if (labelMatch) {
    return `GNOME Shell ${labelMatch[1].trim()}`;
  }

  const altMatch = normalized.match(/Shell\s*versions?\s*<\/dt>\s*<dd>([^<]+)<\/dd>/i);
  if (altMatch) {
    return `GNOME Shell ${altMatch[1].trim()}`;
  }

  const textMatch = normalized.match(/GNOME Shell\s*([0-9][^<\n]+)/i);
  if (textMatch) {
    return `GNOME Shell ${textMatch[1].trim().replace(/\s*–\s*/g, '–')}`;
  }

  return null;
};

const extractVersionByPk = (html, pk) => {
  if (!pk) {
    return null;
  }
  const rowRegex = new RegExp(`<tr\\s+data-pk="${pk}"[^>]*>([\\s\\S]*?)</tr>`, 'i');
  const row = html.match(rowRegex);
  if (!row) {
    return null;
  }
  const cell = row[1].match(/<td[^>]*>([\s\S]*?)<\/td>/i);
  if (!cell) {
    return null;
  }
  const version = normalizeVersionLabel(stripHtml(cell[1]));
  return version && !isRevisionOnlyVersion(version) ? version : null;
};

const extractFirstActiveVersion = (html) => {
  const rowRegex = /<tr\s+data-pk="\d+"[^>]*>([\s\S]*?)<\/tr>/gi;
  for (const match of html.matchAll(rowRegex)) {
    const body = match[1];
    if (!/extension-status\s+active/i.test(body)) {
      continue;
    }
    const cell = body.match(/<td[^>]*>([\s\S]*?)<\/td>/i);
    if (!cell) {
      continue;
    }
    const version = normalizeVersionLabel(stripHtml(cell[1]));
    if (version && !isRevisionOnlyVersion(version)) {
      return version;
    }
  }
  return null;
};

const fetchHtml = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Request failed with ${res.statusCode}`));
          res.resume();
          return;
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });

const fetchJson = async (url) => {
  const html = await fetchHtml(url);
  return JSON.parse(html);
};

const extractFromInfoApi = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const next = {};

  const labelFields = ['version-name', 'version_name', 'versionName', 'latest_version_name'];
  for (const field of labelFields) {
    const value = normalizeVersionLabel(payload[field]);
    if (value && !isRevisionOnlyVersion(value)) {
      next.latestVersion = value;
      break;
    }
  }

  const pkFields = ['version_tag', 'version-tag', 'versionTag'];
  for (const field of pkFields) {
    const raw = payload[field];
    if (raw !== undefined && raw !== null) {
      const pk = String(raw).trim();
      if (/^\d+$/.test(pk)) {
        next.versionPk = pk;
        break;
      }
    }
  }

  if (payload.shell_version_map && typeof payload.shell_version_map === 'object') {
    const shells = Object.keys(payload.shell_version_map).filter((key) => /^\d+(\.\d+)?$/.test(key));
    if (shells.length) {
      const sorted = [...new Set(shells)].sort((a, b) => Number.parseInt(a, 10) - Number.parseInt(b, 10));
      next.gnomeShell =
        sorted.length === 1 ? `GNOME Shell ${sorted[0]}` : `GNOME Shell ${sorted[0]}–${sorted[sorted.length - 1]}`;
    }
  }

  return Object.keys(next).length ? next : null;
};

const run = async () => {
  try {
    let gnomeShell = fallback.gnomeShell;
    let latestVersion = fallback.latestVersion;
    let versionPk = null;
    let apiError;

    try {
      const apiPayload = await fetchJson(EGO_INFO_URL);
      const apiData = extractFromInfoApi(apiPayload);
      if (apiData) {
        gnomeShell = apiData.gnomeShell ?? gnomeShell;
        latestVersion = apiData.latestVersion ?? latestVersion;
        versionPk = apiData.versionPk ?? null;
      }
    } catch (error) {
      apiError = error;
    }

    const needsHtml =
      latestVersion === fallback.latestVersion ||
      gnomeShell === fallback.gnomeShell ||
      isRevisionOnlyVersion(latestVersion) ||
      Boolean(versionPk);

    if (needsHtml) {
      const html = await fetchHtml(EGO_URL);
      gnomeShell = extractShellVersions(html) ?? gnomeShell;
      const byPk = extractVersionByPk(html, versionPk);
      const htmlVersion = byPk ?? extractFirstActiveVersion(html);
      if (htmlVersion) {
        latestVersion = htmlVersion;
      }
    }

    await writeFile(
      OUTPUT,
      JSON.stringify(
        {
          gnomeShell,
          latestVersion,
          fetchedAt: new Date().toISOString(),
          ...(apiError ? { apiError: apiError.message } : {}),
        },
        null,
        2
      )
    );
  } catch (error) {
    await writeFile(
      OUTPUT,
      JSON.stringify(
        {
          ...fallback,
          fetchedAt: new Date().toISOString(),
          error: error.message,
        },
        null,
        2
      )
    );
  }
};

run();
