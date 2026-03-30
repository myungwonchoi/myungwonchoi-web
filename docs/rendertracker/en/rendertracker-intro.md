# Introduction to RenderTracker

> [RenderTracker](https://ddingone.gumroad.com/l/RenderTracker) monitors the rendering progress of 3D software (Cinema 4D, Blender) in real time and sends notifications via messenger (Discord, Telegram).
>
> Supports `Blender 4.0` or later and `Cinema 4D R2023` or later.

---
![guide-mainui | w-800](res/rendertracker/guide-mainui.webp)
#### Left Panel
Displays a history of rendered files.
Click an item to view the render history entries.

<br>

#### Right Panel
Displays render information and status for the current project file. Timing-related details are shown in the bottom panel.

<br>

#### Top-Right Buttons
From left to right: messenger notifications, app volume, app-wide notifications, and settings.

---

## Notifications

A notification appears in the bottom-right corner of the screen whenever the rendering status is updated.

<table><tr>
<td>

**Render Started**  
Notifies when rendering begins.

![guide-popup-start](res/rendertracker/guide-popup-start.webp)

</td>
<td>

**Render Finished**  
Notifies when rendering is complete.

![guide-popup-finish](res/rendertracker/guide-popup-finish.webp)

</td>
</tr><tr>
<td>

**Render Stopped**  
Notifies when rendering is interrupted, including info at the point of stop.

![guide-popup-stop](res/rendertracker/guide-popup-stop.webp)

*Still detects even if the 3D software is unresponsive or closed.*

</td>
<td>

**Frame Delay**  
Notifies when a specific frame takes longer than the configured time.

![guide-popup-delay](res/rendertracker/guide-popup-delay.webp)

*Still detects even if the 3D software is unresponsive or closed.*

</td>
</tr></table>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
