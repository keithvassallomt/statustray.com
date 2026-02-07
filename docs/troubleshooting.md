# Troubleshooting

## Icon not showing

- Confirm the app supports StatusNotifierItem/AppIndicator.
- Restart the target app.
- Check that **Status Tray** is enabled in GNOME Extensions.

## Menu does not open

- Try a full app restart.
- Disable other tray-related extensions to rule out conflicts.
- Log out and log back in.

## Wrong icon style

- Open extension preferences.
- Toggle symbolic/original mode.
- Re-apply per-app icon settings.

## Icons diseappear after sleep

- This is a known issue with some apps. Certain apps will not properly resume their connection with their tray icon after a suspend or sleep. Status Tray removes these 'ghost' icons. Restarting the app or the extension usually resolves it.

## Icons are invisible or show up as '...'

- This usually happens when the app is not properly reporting its icon or menu. Try restarting the app. If it persists, check the app's settings for any tray-related options. 

## Reporting issues

If you encounter a bug, please report it on the [GitHub Issues page](https://github.com/keithvassallomt/status-tray/issues) with detailed steps to reproduce, screenshots, and logs if possible.

:::warning Support Limitations
Please note that while I will do my best to assist with troubleshooting, I may not be able to resolve all issues, especially those related to specific applications or system configurations. Particularly, **Electron apps** and **Electron apps running in Flatpak** are known to have various issues with tray icons due to how they implement (or fail to implement) the StatusNotifierItem/AppIndicator specification. In such cases, the best course of action is often to report the issue to the app developers and encourage them to improve their tray icon support.
:::