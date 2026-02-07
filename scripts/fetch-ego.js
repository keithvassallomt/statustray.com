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

const extractLatestVersion = (html) => {
  const preferredLabelMatches = [
    html.match(/>\s*Version\s*Name\s*<\/dt>\s*<dd>([\s\S]*?)<\/dd>/i),
    html.match(/>\s*Version\s*name\s*<\/dt>\s*<dd>([\s\S]*?)<\/dd>/i),
  ];
  for (const match of preferredLabelMatches) {
    if (!match) {
      continue;
    }
    const version = normalizeVersionLabel(stripHtml(match[1]));
    if (version && !isRevisionOnlyVersion(version)) {
      return version;
    }
  }

  const labelMatch = html.match(/>\s*Version\s*<\/dt>\s*<dd>([\s\S]*?)<\/dd>/i);
  if (labelMatch) {
    const version = normalizeVersionLabel(stripHtml(labelMatch[1]));
    if (version && !isRevisionOnlyVersion(version)) {
      return version;
    }
  }

  const normalized = html.replace(/\s+/g, ' ');
  const textMatch = normalized.match(/(?:Latest\s+)?Version\s*Name[^0-9A-Za-z]*([0-9][0-9A-Za-z.\-]*)/i);
  if (textMatch) {
    return textMatch[1].trim();
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

  const preferredLabelFields = [
    'version-name',
    'version_name',
    'versionName',
    'latest_version_name',
    'version-tag',
    'version_tag',
    'versionTag',
  ];
  for (const field of preferredLabelFields) {
    const value = normalizeVersionLabel(payload[field]);
    if (value) {
      next.latestVersion = value;
      break;
    }
  }

  if (!next.latestVersion && (typeof payload.version === 'number' || typeof payload.version === 'string')) {
    next.latestVersion = normalizeVersionLabel(String(payload.version)) ?? String(payload.version);
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
    let apiError;

    try {
      const apiPayload = await fetchJson(EGO_INFO_URL);
      const apiData = extractFromInfoApi(apiPayload);
      if (apiData) {
        gnomeShell = apiData.gnomeShell ?? gnomeShell;
        latestVersion = apiData.latestVersion ?? latestVersion;
      }
    } catch (error) {
      apiError = error;
    }

    if (latestVersion === fallback.latestVersion || gnomeShell === fallback.gnomeShell || isRevisionOnlyVersion(latestVersion)) {
      const html = await fetchHtml(EGO_URL);
      gnomeShell = extractShellVersions(html) ?? gnomeShell;
      const htmlVersion = extractLatestVersion(html);
      if (htmlVersion && (!latestVersion || latestVersion === fallback.latestVersion || isRevisionOnlyVersion(latestVersion))) {
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
