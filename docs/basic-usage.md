# Basic Usage

## Enabling the Extension

If you installed the extension from the GNOME Extensions website, it should be enabled automatically. If you need to enable it manually:

1. Open the GNOME [Extensions](https://flathub.org/en/apps/org.gnome.Extensions) or [Extension Manager](https://flathub.org/en/apps/com.mattjakeman.ExtensionManager) app.
2. Find "Status Tray" in the list of installed extensions.
3. Toggle the switch to enable it.

![Enable Status Tray in Extension Manager](/extension_manager.png)

Once it's enabled, apps that support tray icons will show them in the top panel. If all you want is for tray icons to appear in GNOME, you're done: you don't need to change any settings.

## Opening the Settings

To change how Status Tray looks and behaves, open its settings:

1. Open the GNOME [Extensions](https://flathub.org/en/apps/org.gnome.Extensions) or [Extension Manager](https://flathub.org/en/apps/com.mattjakeman.ExtensionManager) app.
2. Find "Status Tray" in the list of installed extensions.
3. Click the gear icon to open the settings.

![Open Status Tray settings](/settings.png)

::: tip
You can also open the settings from a terminal:

```bash
gnome-extensions prefs status-tray@keithvassallo.com
```
:::

![Status Tray settings window](/settings-window.png)

The settings are split across three tabs. Switch between them using the buttons at the top of the window:

- **[Apps](/apps)**: every app currently showing a tray icon. Show or hide apps, change their order, and customise each app's icon.
- **[Appearance](/appearance)**: how tray icons look, including their style, size and spacing, and which part of the top bar holds the tray.
- **[Behaviour](/behaviour)**: what a click on a tray icon does, a keyboard shortcut for opening tray menus, and the overflow menu.

The window opens on the Apps tab. Changes take effect as soon as you make them, so there's nothing to save.

To check which version of Status Tray you're running, click the menu button in the top right corner of the settings window and choose **About Status Tray**.
