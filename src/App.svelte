<script>
  import { onMount } from 'svelte';
  import ego from './data/ego.json';

  const links = {
    install: 'https://extensions.gnome.org/extension/9164/status-tray/',
    source: 'https://github.com/keithvassallomt/status-tray',
    docs: 'https://docs.statustray.com',
  };

  let latestVersionName = ego.latestVersion ?? 'Unknown';
  let gnomeShell = ego.gnomeShell ?? 'GNOME Shell';
  let theme = 'system';
  let symbolicPreview = true;
  let nextThemeValue = 'light';
  const configItems = [
    'Per-app visibility toggles',
    'Drag-and-drop ordering',
    'Icon overrides or custom file paths',
    'Symbolic tuning with live preview',
  ];

  const applyTheme = (value) => {
    const root = document.documentElement;
    if (value === 'light') {
      root.setAttribute('data-theme', 'light');
    } else if (value === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  const applySystemTheme = () => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(media.matches ? 'dark' : 'light');
  };

  const cycleTheme = () => {
    theme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    localStorage.setItem('statustray-theme', theme);
    if (theme === 'system') {
      applySystemTheme();
    } else {
      applyTheme(theme);
    }
  };

  $: nextThemeValue = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';

  onMount(() => {
    const stored = localStorage.getItem('statustray-theme');
    if (stored) {
      theme = stored;
    }
    if (theme === 'system') {
      applySystemTheme();
    } else {
      applyTheme(theme);
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystem = () => {
      if (theme === 'system') {
        applyTheme(media.matches ? 'dark' : 'light');
      }
    };
    syncSystem();
    media.addEventListener?.('change', syncSystem);
    return () => media.removeEventListener?.('change', syncSystem);
  });
</script>

<main>
  <header class="section" style="padding-bottom: 48px;">
    <div class="container flex flex-col gap-10">
      <nav class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Status Tray logo" class="h-10 w-10 object-contain" />
          <div>
            <div class="text-sm tracking-[0.35em] uppercase text-(--muted)">Status Tray</div>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-4">
          <a class="button ghost" href={links.docs} target="_blank" rel="noreferrer">Docs</a>
          <a class="button ghost" href={links.source} target="_blank" rel="noreferrer">View Source</a>
          <button class="button ghost" type="button" on:click={cycleTheme} aria-label="Toggle theme">
            {#if nextThemeValue === 'system'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                <rect x="4" y="5" width="16" height="11" rx="2" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 19h8" />
              </svg>
            {:else if nextThemeValue === 'light'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                <circle cx="12" cy="12" r="4" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6l-1.4 1.4M6.6 17l-1.4 1.4" />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
              </svg>
            {/if}
          </button>
        </div>
        <div class="md:hidden">
          <button class="button ghost" type="button" on:click={cycleTheme} aria-label="Toggle theme">
            {#if nextThemeValue === 'system'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                <rect x="4" y="5" width="16" height="11" rx="2" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 19h8" />
              </svg>
            {:else if nextThemeValue === 'light'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                <circle cx="12" cy="12" r="4" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6l-1.4 1.4M6.6 17l-1.4 1.4" />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
              </svg>
            {/if}
          </button>
        </div>
      </nav>

      <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div class="flex flex-col gap-6">
          <span class="badge self-start">v{latestVersionName} · {gnomeShell}</span>
          <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] fade-up">
            The System Tray, Back in GNOME.
          </h1>
          <p class="text-lg text-(--muted) max-w-xl fade-up delay-1">
            System tray icons, back in GNOME. Install it and 
            forget it, or tune every icon to your liking with live previews.
          </p>
          <div class="flex flex-wrap gap-4 fade-up delay-2">
            <a class="ego-button" href={links.install} target="_blank" rel="noreferrer">
              <img src="/images/get-it-on-ego.svg" alt="Get it on GNOME Extensions" class="h-18" />
            </a>
            <a class="button ghost" href={links.source} target="_blank" rel="noreferrer">View Source</a>
          </div>
          <div class="flex items-center gap-4 text-sm text-(--muted)">
            <span>100% in-shell</span>
            <span>•</span>
            <span>Zero config needed</span>
            <span>•</span>
            <span>Per-app tuning</span>
          </div>
        </div>
        <div class="card">
          <img src="/images/screenshot-1.png" alt="Tray icons in the GNOME panel" />
          <p class="text-sm text-(--muted) mt-3">Just install it and get your system tray back.</p>
        </div>
      </div>
    </div>
  </header>

  <section class="section" style="padding-top: 24px;">
    <div class="container grid gap-10 lg:grid-cols-3">
      <div class="card">
        <div class="text-sm uppercase tracking-[0.2em] text-(--muted)">Credibility</div>
        <h2 class="font-serif text-3xl mt-3">Modern tray, real apps.</h2>
        <p class="text-(--muted) mt-4">
          Runs entirely inside GNOME Shell with the StatusNotifierItem protocol and DBusMenu.
          No legacy daemons, no hacks.
        </p>
      </div>
      <div class="card">
        <div class="text-sm uppercase tracking-[0.2em] text-(--muted)">Compatibility</div>
        <h2 class="font-serif text-3xl mt-3">{gnomeShell} ready.</h2>
        <p class="text-(--muted) mt-4">
          Built for modern GNOME releases with libadwaita preferences and fast in-shell rendering.
        </p>
      </div>
      <div class="card">
        <div class="text-sm uppercase tracking-[0.2em] text-(--muted)">Setup</div>
        <h2 class="font-serif text-3xl mt-3">Zero config by default.</h2>
        <p class="text-(--muted) mt-4">
          Install, enable, and your StatusNotifierItem apps appear automatically.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="flex flex-col gap-8">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div class="badge">Highlights</div>
            <h2 class="font-serif text-4xl mt-4">Everything you expect, nothing you do not.</h2>
          </div>
          <a class="button ghost" href={links.docs} target="_blank" rel="noreferrer">Docs</a>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="card highlight-card">
            <div class="text-(--muted)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 12h16M12 4v16" />
              </svg>
            </div>
            <h3 class="font-semibold text-xl">Automatic discovery</h3>
            <p class="text-(--muted) mt-3">
              Watcher registers apps instantly, even when they start before the shell.
            </p>
          </div>
          <div class="card highlight-card">
            <div class="text-(--muted)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 7h12M6 12h12M6 17h8" />
              </svg>
            </div>
            <h3 class="font-semibold text-xl">Full menus</h3>
            <p class="text-(--muted) mt-3">
              Menu support, including sub-mens, toggles and separators
            </p>
          </div>
          <div class="card highlight-card">
            <div class="text-(--muted)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 12h10M12 7v10" />
                <circle cx="12" cy="12" r="7" />
              </svg>
            </div>
            <h3 class="font-semibold text-xl">Dual icon modes</h3>
            <p class="text-(--muted) mt-3">
              Switch between symbolic or original icons to match any panel style.
            </p>
          </div>
          <div class="card highlight-card">
            <div class="text-(--muted)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5v14" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4l16 16" />
              </svg>
            </div>
            <h3 class="font-semibold text-xl">Per-app overrides</h3>
            <p class="text-(--muted) mt-3">
              Override icons, tune effects, and keep important apps front and center.
            </p>
          </div>
          <div class="card highlight-card">
            <div class="text-(--muted)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h10v10H7z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h4v4H4zM16 16h4v4h-4z" />
              </svg>
            </div>
            <h3 class="font-semibold text-xl">Drag-and-drop order</h3>
            <p class="text-(--muted) mt-3">
              Reorder apps live from the preferences without restarting GNOME.
            </p>
          </div>
          <div class="card highlight-card">
            <div class="text-(--muted)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="7" />
              </svg>
            </div>
            <h3 class="font-semibold text-xl">Live updates</h3>
            <p class="text-(--muted) mt-3">
              Icon refreshes and status signals are handled automatically in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top: 0;">
    <div class="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div class="grid gap-6">
        <div>
          <div class="badge">Live Demo</div>
          <h2 class="font-serif text-4xl mt-4">See the tray in motion.</h2>
          <p class="text-(--muted) mt-4">
            Open menus, preview icon changes, and watch how Status Tray stays quiet until you need it.
          </p>
        </div>
        <div class="card">
          <div class="overflow-hidden rounded-2xl border border-(--border)" style="aspect-ratio: 868 / 986;">
            <video
              src="/videos/statustray_promo.mp4"
              class="h-full w-full object-cover"
              autoplay
              muted
              loop
              playsinline
              preload="metadata"
            ></video>
          </div>
        </div>
      </div>
      <div class="grid gap-5">
        <div class="card">
          <img src="/images/screenshot-2.png" alt="App menu rendered from DBusMenu" />
          <p class="text-sm text-(--muted) mt-3">Menus render with real app actions.</p>
        </div>
        <div class="card">
          <img src="/images/screenshot-3.png" alt="Preferences list of tray apps" />
          <p class="text-sm text-(--muted) mt-3">Preferences list with per-app control.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
      <div class="card">
        <div class="badge">How It Works</div>
        <h2 class="font-serif text-4xl mt-4">Three simple steps.</h2>
        <div class="mt-6 grid gap-4">
          <div class="flex items-start gap-4">
            <div class="h-10 w-10 rounded-full bg-(--bg-elev) border border-(--border) grid place-items-center font-semibold">
              1
            </div>
            <div>
              <h3 class="font-semibold">Watcher listens</h3>
              <p class="text-(--muted)">StatusNotifierItem registrations appear on the session bus.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="h-10 w-10 rounded-full bg-(--bg-elev) border border-(--border) grid place-items-center font-semibold">
              2
            </div>
            <div>
              <h3 class="font-semibold">Tray items render</h3>
              <p class="text-(--muted)">Each app becomes a panel button with icon and menu.</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <div class="h-10 w-10 rounded-full bg-(--bg-elev) border border-(--border) grid place-items-center font-semibold">
              3
            </div>
            <div>
              <h3 class="font-semibold">Menus stay live</h3>
              <p class="text-(--muted)">DBusMenu calls keep actions fresh as apps update.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-6">
        <div class="card">
          <img src="/images/screenshot-4.png" alt="Icon picker dialog" />
          <p class="text-sm text-(--muted) mt-3">Icon picker for per-app overrides.</p>
        </div>
        <div class="card">
          <img src="/images/screenshot-6.png" alt="Icon modes comparison" />
          <p class="text-sm text-(--muted) mt-3">Original vs symbolic icon modes.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="padding-top: 0;">
    <div class="container">
      <div class="card grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <div class="badge">Configuration</div>
          <h2 class="font-serif text-4xl mt-4">Control every app.</h2>
          <p class="text-(--muted) mt-4">
            Toggle visibility, pick icons, and tune symbolic effects without restarting your shell.
          </p>
          <div class="checklist">
            {#each configItems as item}
              <div class="checklist-item">
                {#if symbolicPreview}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                {:else}
                  <span aria-hidden="true">✅</span>
                {/if}
                <span>{item}</span>
              </div>
            {/each}
          </div>
        </div>
        <div class="card">
          <h3 class="font-semibold text-xl">Instant feedback</h3>
          <p class="text-(--muted) mt-3">
            Toggle symbolic preview to see how changes reflect across the tray instantly.
          </p>
          <div class="mt-5 rounded-2xl border border-(--border) p-4 bg-(--bg-elev)">
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="font-medium">Symbolic preview</div>
                <div class="text-xs text-(--muted)">Default on</div>
              </div>
              <button
                class="toggle"
                type="button"
                on:click={() => (symbolicPreview = !symbolicPreview)}
                aria-pressed={symbolicPreview}
              >
                <span class={`toggle-track ${symbolicPreview ? 'on' : ''}`}></span>
                <span class="text-sm text-(--muted)">
                  {symbolicPreview ? 'On' : 'Off'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="card flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <div class="badge">Install</div>
          <h2 class="font-serif text-4xl mt-4">Bring the tray back today.</h2>
          <p class="text-(--muted) mt-3">
            Install from GNOME Extensions, enable, and enjoy the modern tray again.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <a class="ego-button" href={links.install} target="_blank" rel="noreferrer">
            <img src="/images/get-it-on-ego.svg" alt="Get it on GNOME Extensions" class="h-18" />
          </a>
          <a class="button ghost" href={links.docs} target="_blank" rel="noreferrer">View Docs</a>
        </div>
      </div>
    </div>
  </section>

  <footer class="section" style="padding-top: 0;">
    <div class="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-(--muted)">
      <div>
        © 2026{' '}
        <a
          href="https://keithvassallo.com"
          target="_blank"
          rel="noreferrer"
          class="border-b border-dashed border-current"
        >
          Keith Vassallo</a>. Built for GNOME users.
      </div>
      <div class="flex items-center gap-4">
        <a href={links.docs} target="_blank" rel="noreferrer">Docs</a>
        <a href={links.source} target="_blank" rel="noreferrer">Source</a>
        <a href={links.install} target="_blank" rel="noreferrer">Install</a>
        <a href="https://friendlymanifesto.org" target="_blank" rel="noreferrer">
          <img src="/friendly-manifesto-badge-white.svg" alt="We Are Friendly" class="h-6" />
        </a>
      </div>
    </div>
  </footer>
</main>
