# Discord Webhook Setup Guide

> This guide explains how to receive RenderTracker notifications in a Discord channel.
> Discord must be installed on your PC.

![discord-message | w-600](res/rendertracker/discord-message.webp)

---

## 1. Create a Discord Webhook URL
You need a Discord server to receive RenderTracker notifications. (DM channels are not supported)
You must either create your own server or have server management permissions.

<br>

1.  Click the **`server name`** to open **`server settings`**, or click the gear icon on the right side of a channel.  
![discord-serversettings | w-300](res/rendertracker/discord-serversettings.webp)
![discord-channelsettings | w-300](res/rendertracker/discord-channelsettings.webp)

<br>

2.  Click the **`Integrations`** tab in the left menu, then click **`Create Webhook`**.
![discord-link | w-1000](res/rendertracker/discord-link.webp)

<br>

3.  Enter a **`Name`** and **`Channel`**, then click **`Copy Webhook URL`** to copy it.
![discord-link-copy | w-1000](res/rendertracker/discord-link-copy.webp)
    *   **Name**: Webhook name (e.g., `RenderTracker`)
    *   **Channel**: The channel to receive notifications
<br>

![RenderTracker Profile Image | w-100](res/rendertracker/rendertracker-512x512-sharp.png)  
*RenderTracker profile image*

---

## 2. Apply the Discord Webhook URL in RenderTracker

1.  Enable the **`Discord icon`** in the top-right of the app.  
![discord-activate-discord-button | w-300](res/rendertracker/discord-activate-discord-button.webp)

<br>

2.  Click the **`gear icon`** in the top-right of the app.  
![click-settings-button | w-300](res/rendertracker/click-settings-button.webp)

<br>

3.  Paste the copied URL into the **`Webhook URL`** field under the **`Discord Webhook`** section.  
![discord-paste-webhookurl | w-600](res/rendertracker/discord-paste-webhookurl.webp)
<br>

---

## 3. Verify Notifications

*   Click the **`Test Message`** button to verify the Discord connection is working.  
![discord-testmessage-button | w-600](res/rendertracker/discord-testmessage-button.webp)
![discord-testmessage | w-400](res/rendertracker/discord-testmessage.webp)  
If you don't receive a notification, check that the Webhook URL is correct and that the **`Discord icon`** at the top of the app is active (colored).  

---

## ⚠️ Notes
*   Mobile notifications will not arrive while the PC Discord app is running.
    Even with the PC app closed, mobile notifications are not real-time, so some manual checking is required.
    (Using Telegram is recommended.)

*   If your Webhook URL is leaked, anyone can send messages to your channel. Keep it private.

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
