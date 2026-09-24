import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Status Tray Docs',
  description: 'Documentation for Status Tray on GNOME.',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Status Tray Docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installing', link: '/installing' },
      { text: 'Basic Usage', link: '/basic-usage' },
      {
        text: 'Settings',
        items: [
          { text: 'Apps', link: '/apps' },
          { text: 'Appearance', link: '/appearance' },
          { text: 'Behaviour', link: '/behaviour' },
        ],
      },
      { text: 'Troubleshooting', link: '/troubleshooting' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installing', link: '/installing' },
          { text: 'Basic Usage', link: '/basic-usage' },
        ],
      },
      {
        text: 'Settings',
        items: [
          { text: 'Apps', link: '/apps' },
          { text: 'Appearance', link: '/appearance' },
          { text: 'Behaviour', link: '/behaviour' },
        ],
      },
      {
        text: 'Help',
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/keithvassallomt/status-tray' }],
    search: {
      provider: 'local',
    },
  },
});
