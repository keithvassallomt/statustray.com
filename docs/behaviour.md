# Behaviour

The **Behaviour** tab controls how you interact with the tray: what a click does, a keyboard shortcut for opening tray menus, and overflow for when you have more icons than you want in the panel.

![Behaviour tab](/behaviour-tab.png)

## Interaction

### Click action

Choose what happens when you click a tray icon:

- **Click for menu (default)**: a left or right click opens the app's menu.
- **Left click to open, Right click for menu**: a left click opens the app's window, while a right click opens its menu.
- **Double-click to open, Click for menu**: a double click opens the app's window, while a single click opens its menu (after a brief delay).

Whichever you choose, a right click always opens the menu, and a middle click triggers the app's secondary action, where the app supports one.

::: tip
Some applications don't provide an action to open their window from the tray icon. For those apps, Status Tray falls back to showing the menu.
:::

### Open menu shortcut

This lets you reach the tray without a pointer. Pressing the shortcut opens the menu of the leftmost tray icon and moves keyboard focus into it, so you can act on it straight away.

Once the menu is open:

- **Up** and **Down** move between the items in the menu, and **Enter** activates the highlighted one.
- **Left** and **Right** move to the menu of the neighbouring tray icon, so you can reach every app in the tray from a single key press.
- **Esc** closes the menu, as does pressing the shortcut again.

To set a shortcut, click the **Open menu shortcut** row and press the combination you want. Press **Esc** to cancel without changing anything, or **Backspace** to remove a shortcut you've already set.

No shortcut is set by default, and the row reads "Disabled" until you set one. The combination must include a modifier such as <kbd>Super</kbd>, <kbd>Ctrl</kbd> or <kbd>Alt</kbd>. A single letter on its own would be captured everywhere and stop you typing it.

If you've enabled [overflow](#overflow) and set the [inline icon limit](#inline-icon-limit) so that every icon lives in the overflow menu, the shortcut opens that menu instead. With the [icon strip](#icon-strip), it slides the strip out and opens the first icon's menu.

::: warning Shortcut Conflicts
GNOME doesn't let an extension check whether a shortcut is already in use, so Status Tray can't warn you about a clash. If your shortcut appears to do nothing, it's most likely already taken by GNOME itself, another extension, or an application. Try a different combination.
:::

## Overflow

If you have many tray icons, you can keep a few in the panel and collapse the rest into a single overflow button. Overflow has two modes, which decide what that button does:

- **Icon menu** (default): the button opens a menu listing the hidden apps.
- **Icon strip**: the button is an arrow that slides the hidden icons out in the top bar.

Overflow is off by default. The other overflow settings are greyed out until you turn it on.

### Icon menu

Clicking the overflow button opens a menu listing the other apps, and each one expands to show that app's own menu.

![Overflow menu](/overflow_menu.png)

### Icon strip

In this mode, the overflow button is an arrow. Clicking the arrow slides the hidden icons out in the top bar beside it, and clicking it again tucks them away.

If there are more icons than the strip has room for, half of the next icon peeks out, faded, at the edge of the strip. Scroll the strip with the mouse wheel, or click that half icon to bring it into view. [Strip width](#strip-width) sets how many icons fit.

![Icon strip](/strip_mode.png)

Each icon in the strip opens its own menu, just like an icon in the panel.

![Icon strip with a menu open](/strip_mode_with_menu.png)

The [open menu shortcut](#open-menu-shortcut) works here too. When every icon is in the strip, the shortcut slides the strip out and opens the first icon's menu.

To switch to the icon strip, open the [settings window](/basic-usage#opening-the-settings) and go to the **Behaviour** tab. In the **Overflow** group, turn on **Enable overflow**, then set **Mode** to **Icon strip**.

![Overflow settings in Icon strip mode](/strip_mode_settings.png)

### Enable overflow

Turn this on to collapse extra icons into the overflow button, which sits at the right end of the tray. The button only appears when you have more icons than the [inline icon limit](#inline-icon-limit).

### Mode

Choose how the hidden icons are shown:

- **Icon menu** (default): in a menu that opens from the overflow button. See [Icon menu](#icon-menu).
- **Icon strip**: in a strip that slides out in the top bar beside an arrow. See [Icon strip](#icon-strip).

Each mode has a setting of its own, and only that mode's row is shown: **Button icon** for Icon menu, and **Strip width** for Icon strip.

### Button icon

This row only appears when **Mode** is set to **Icon menu**, since the icon strip always uses an arrow. Choose what the overflow button looks like in the panel:

- **Static icon** (default): Status Tray's own overflow icon, which follows your [icon style](/appearance#icon-style).
- **Dynamic preview (colour)**: a live preview of up to four of the icons in the overflow menu, in their original colours.
- **Dynamic preview (monochrome)**: the same preview, recoloured to monochrome with an outline around each icon so overlapping icons stay legible.
- **Custom icon**: an icon of your choice, set in the **Custom overflow icon** row.

The dynamic previews set their colours independently of your icon style, so you can, for example, use symbolic icons in the panel with a colour preview on the overflow button.

### Custom overflow icon

This row only appears when **Button icon** is set to **Custom icon**. Click **Choose…** to open the icon picker, then pick an icon from your theme or use **Choose File...** to select an image file (PNG or SVG). The icon is shown as it is, at your chosen [icon size](/appearance#size).

Until you choose an icon, or if the file you chose goes missing, the button shows Status Tray's standard overflow icon.

### Strip width

This row only appears when **Mode** is set to **Icon strip**. It sets how many icons the strip shows at once before it scrolls. The width ranges from 1 to 20, and the default is 4.

On a crowded panel, the strip can shrink to fit, showing fewer icons than you set here.

### Inline icon limit

Sets how many icons stay in the panel all the time, outside the overflow menu or strip. For example, if you set it to 2, only 2 icons will be shown in the panel, and the rest will be moved to the menu or strip. The limit ranges from 0 to 20, and the default is 0.

At 0, every tray icon goes into the menu or strip, leaving just the overflow button in the panel.
