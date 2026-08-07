# Customisation

## Custom Icons

Status Tray allows you to change the icon used by an application. This is useful if an application doesn't provide a symbolic icon, or if you prefer a different icon for a particular application.

Start by clicking on the icon you want to change in Status Tray settings. 

![Choose icon to customise](/custom_icon_1.png)

Then, you can choose a custom icon from the picker provided. You can choose between symbolic icons (which will match your system theme) or application icons. 

![Custom icon picker](/custom_icon_2.png)

You can also use **Choose file...** to select any icon from your files.

::: tip Custom Icon Size
Although Status Tray will attempt to resize your icons to fit the panel, you should ideally be using icons that are 16x16 pixels for the best results.
:::

If you want to revert to the default icon for an application, simply click the "Reset to Default" button.

## Icon Size
The size of the status icons in the GNOME top panel can be customised via the main settings panel. 

![Icon size slider](/icon-size.png)

Sizes range from 14px (smallest) to 20px (largest). The default size is 16px. 

## Padding Between Icons
You can adjust the gap between adjacent status icons in the panel using the **Padding between icons** slider.

The value is the total gap, in pixels, between two neighbouring icons, and ranges from 0px (icons sit flush together) to 20px. The default is 4px. Changes apply immediately.

## Icon Interaction
The **Icon interaction** setting controls what happens when you click a status icon:

- **Click for menu** (default): a left or right click opens the application's menu.
- **Left click to open, Right click for menu**: a left click opens the application's window, while a right click opens its menu.
- **Double-click to open, Click for menu**: a double click opens the application's window, while a single click opens its menu (after a brief delay).

In every mode, a right click opens the menu and a middle click triggers the application's secondary action, where the app supports one.

::: tip
Some applications don't provide an action to open their window from the tray icon. For those apps, Status Tray falls back to showing the menu.
:::

## Keyboard Shortcut

The **Open Menu Shortcut** setting lets you reach the tray without a pointer. Pressing the shortcut opens the menu of the leftmost status icon and moves keyboard focus into it, so you can act on it straight away.

Once the menu is open:

- **Up** and **Down** move between the items in the menu, and **Enter** activates the highlighted one.
- **Left** and **Right** move to the menu of the neighbouring status icon, so you can reach every app in the tray from a single key press.
- **Esc** closes the menu, as does pressing the shortcut again.

To set a shortcut, click the **Open Menu Shortcut** row in settings and press the combination you want. Press **Esc** to cancel without changing anything, or **Backspace** to remove a shortcut you've already set.

No shortcut is set by default, and the combination must include a modifier such as <kbd>Super</kbd>, <kbd>Ctrl</kbd> or <kbd>Alt</kbd>. A single letter on its own would be captured everywhere and stop you typing it.

If you've enabled overflow icons and set the slider so that every icon lives in the overflow menu, the shortcut opens that menu instead.

::: warning Shortcut Conflicts
GNOME doesn't let an extension check whether a shortcut is already in use, so Status Tray can't warn you about a clash. If your shortcut appears to do nothing, it's most likely already taken by GNOME itself, another extension, or an application. Try a different combination.
:::

## Fallback Icons

Sometimes, you may want to use the default icon provided by an app, but that icon might fail to load in certain situatons. This typically happens when an icon is missing on your system, or when an app doesn't properly set the icon name. In this case, you'll want to enable **Use as Fallback Only**. This will use the default icon provided by the app, but if that icon fails to load, it will fall back to the icon you've chosen here.

![Fallback icon option](/fallback.png)

::: warning Custom Icon Limitations
Custom icons are **static**. This means that if your app's default icon changes (e.g. to indicate a different status), the custom icon will not change and may become out of sync with the app's actual status. Therefore, it's generally best to use custom icons for apps that don't change their icon based on status, or for apps where the default icon fails to load.
:::

## Ignoring Status Icons

Various apps will change their icon to indicate a change in status. For example, a messaging app might change its icon to show that you have unread messages. If you don't want an app's icon to change based on its status, you can enable the **Ignore App Status Icons** option. This will prevent 
Status Tray from changing the icon based on the app's status.

![Ignore status option](/ignore_status.png)

## Matching by Name

Certain applications have an inconsitent app identifier. This can happen either because of an inconsistent/incomplete implementation of the SNI protocol, a missing desktop file, or purposely to hide the application's presence. In these cases, you may have difficulty associating an icon with the correct application. To work around this, you can enable the **Match by Name** option. This will attempt to match icons to applications based on their name instead of their app identifier. This is less reliable than matching by app identifier, but it can be helpful in cases where the app identifier is inconsistent or missing.

![Match by Name option](/match_name.png)

## Re-ordering Icons

You can change the order of icons in the panel by dragging and dropping them in the settings. Simply click and hold on an icon, then drag it to your desired position and release.

![Re-ordering icons](/reorder.png)

## Overflow Icons

If you have many tray icons, you can choose to show some of them in the overflow menu instead of the panel. This can help reduce clutter in the panel and make it easier to find the icons you use most frequently. 

![Enabling overflow icon](/panel-overflow.png)

To do this, enable the **Overflow Icon** option. The slider lets you choose how many icons to show in the panel before the rest are moved to the overflow menu. For example, if you set the slider to 2, only 2 icons will be shown in the panel, and the rest will be moved to the overflow menu.

![Overflow menu](/overflow_menu.png)

## Fine-tuning Icon Appearance

You can fine-tune the appearance of icons by adjusting them in the fine-tune dialog.

![Fine-tuning icons](/finetune.png)

- **Desaturation**: This option allows you to adjust the saturation of the icon. Increasing desaturation will make the icon more monochrome, while decreasing it will make it more colorful.
- **Brightness**: This option allows you to adjust the brightness of the icon. Increasing brightness will make the icon lighter, while decreasing it will make it darker.
- **Contrast**: This option allows you to adjust the contrast of the icon. Increasing contrast will make the dark areas darker and the light areas lighter, while decreasing it will make the icon more muted.

These adjustments can be particularly helpful for coloured icons when you're using the symbolic style. Status Tray will attempt to apply a monochrome filter to coloured icons when you're using the symbolic style, but this doesn't always produce the best results. By fine-tuning the desaturation, brightness, and contrast, you can achieve a look that better matches your system theme.

:::tip Fine-tuning coloured icons
If you're using the symbolic (monochrome) style and your normally coloured icons look washed out, try decreasing the brightness. This generally produces better results.
:::

If you're using symbolic icons, you can also tint the icon. Simply select a tint colour, and then adjust the desaturation, brightness, and contrast to achieve the desired look.