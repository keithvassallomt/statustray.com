# Apps

The **Apps** tab lists every app that's currently showing a tray icon. It's where you choose which apps appear in the tray, the order they appear in, and how each app's icon looks.

If the list is empty, you'll see **No apps detected yet**. Start an app with tray support, such as Nextcloud, Discord or Slack, and it will appear in the list without you having to reopen the settings.

## Showing and Hiding Apps

Each app has a switch on the right of its row. Turn it off to remove that app's icon from the tray. The app itself keeps running; only its tray icon is hidden. Turn the switch back on to bring the icon back.

![Showing and hiding apps](/hide_icon.png)

A hidden app doesn't appear anywhere in the tray, including the overflow menu. If you'd rather tuck some icons away but keep them within reach, use [Overflow](/behaviour#overflow) instead.

## Re-ordering Apps

Icons appear in the tray in the same order as this list. To change the order, click and hold an app's row, drag it to its new position and release. The tray updates straight away.

![Re-ordering apps](/reorder.png)

To go back to the default order, click the **Reset icon order** button at the top right of the list. Apps then appear in the order Status Tray discovered them.

## Custom Icons

You can change the icon an app shows in the tray. This is useful if an app doesn't provide a symbolic icon, or if you prefer a different icon for a particular app.

Start by clicking the app's icon in the list.

![Choose icon to customise](/custom_icon_1.png)

This opens the icon picker. Your current icon is shown at the top, followed by a grid of icons to choose from. Use the search box to find an icon by name, and the drop-down next to it to switch between **Symbolic** icons (which match your system theme), **Applications** icons, or **All** icons.

![Custom icon picker](/custom_icon_2.png)

- Click an icon in the grid to use it.
- Click **Choose File...** to use any image file instead.
- Click **Reset to Default** to go back to the app's own icon.

Your choice is saved as soon as you make it, and the picker stays open so you can change the options described below. Close it when you're done.

::: tip Custom Icon Size
Although Status Tray will attempt to resize your icons to fit the panel, you should ideally be using icons that are 16x16 pixels for the best results.
:::

::: warning Custom Icon Limitations
Custom icons are **static**. If an app changes its icon to show its status (for example, to flag unread messages), a custom icon won't change with it and may stop reflecting what the app is doing. Custom icons work best for apps that don't change their icon based on status, or for apps whose own icon fails to load.
:::

The icon picker also has three options that control how the custom icon is used.

### Use as Fallback Only

Sometimes you want to keep the app's own icon, but that icon doesn't always load properly. This typically happens when an icon is missing from your system, or when an app doesn't set its icon name correctly.

With **Use as Fallback Only** turned on, Status Tray shows the app's own icon as normal and only switches to your chosen icon when the app sends a low-quality icon or no icon at all.

![Fallback icon option](/fallback.png)

### Ignore App Status Icons

Many apps change their icon to show a change in status. A messaging app might change its icon when you have unread messages, for example. Turn on **Ignore App Status Icons** to keep the icon as it is, even when the app tries to change it.

![Ignore status option](/ignore_status.png)

This option can't be combined with **Use as Fallback Only**. Turning fallback on switches it off.

### Match by App Name

Some apps don't report a consistent identifier. This can be down to an incomplete implementation of the tray protocol, a missing desktop file, or an app that deliberately changes its identifier on every launch. When that happens, your settings for the app (its custom icon, order, effects and whether it's hidden) are lost each time it restarts, because Status Tray sees it as a new app.

Turn on **Match by App Name** to identify the app by its display name instead. This is less reliable than matching by identifier, so only use it for apps that need it.

![Match by App Name option](/match_name.png)

## Icon Effects

When you're using the **Symbolic (monochrome)** [icon style](/appearance#icon-style), Status Tray converts coloured icons to monochrome with a filter. This doesn't always produce the best results, so you can fine-tune the filter for each app.

Click the effects button to the left of an app's switch to open its effect settings. A preview at the top shows the result as you make changes.

![Fine-tuning icons](/finetune.png)

- **Desaturation**: how much colour is removed, from 0 (full colour) to 1 (greyscale).
- **Brightness**: lightens or darkens the icon.
- **Contrast**: increasing contrast makes dark areas darker and light areas lighter, while decreasing it makes the icon more muted.
- **Custom Tint**: turn this on and pick a colour to tint the icon. Combine it with the sliders above to get the look you want.

Click **Apply** to save your changes, **Cancel** to discard them, or **Reset to Default** to go back to Status Tray's standard filter.

Effects only apply in the Symbolic icon style. With **Original (colored)** icons, apps are shown exactly as they provide them. If an app already provides a symbolic icon, only the tint applies, since the other effects would make it invisible.

:::tip Fine-tuning coloured icons
If you're using the symbolic (monochrome) style and your normally coloured icons look washed out, try decreasing the brightness. This generally produces better results.
:::
