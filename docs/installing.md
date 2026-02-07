# Installing

## Requirements

- GNOME 45 or later
- Browser integration for GNOME Extensions (if installing from EGO)

## Install from GNOME Extensions (recommended)

<a href="https://extensions.gnome.org/extension/9164/status-tray/" target="_blank">
<img src="/get-it-on-ego.svg" alt="Get it on EGO" width="200"/></a>

1. Open the extension page: [Status Tray on GNOME Extensions](https://extensions.gnome.org/extension/9164/status-tray/).
2. Enable the extension toggle.
3. Confirm tray icons appear in the top panel.

## Install from source

1. Clone the repository:

```bash
git clone https://github.com/keithvassallomt/status-tray.git
``` 

2. Change to the extension directory:

```bash
cd status-tray
```

3. Install the extension:

```bash
./install.sh
```

4. Enable the extension:

```bash
gnome-extensions enable status-tray@keithvassallo.com
```

5. Log out and log back in to apply the changes.

## Verify installation

- Open **Extensions** and confirm **Status Tray** is enabled.
- Open an app that exposes a tray icon and check it appears.
