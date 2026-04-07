# Telegram Bot Setup Guide

> This guide explains how to receive RenderTracker notifications via a Telegram bot.
> Telegram must be installed on your PC.

![telegram-message | w-500](res/rendertracker/telegram-message.webp)

---

## 1. Find Your Chat ID

1.  Click the **`START BOT`** button at **[@userinfobot](https://t.me/userinfobot)**.  
![userinfobot | w-400](res/rendertracker/telegram-userinfo-web.webp)

<br>

2.  Click the **`Start`** button at the bottom.  
![userinfobot-start | w-600](res/rendertracker/telegram-userinfo-startbutton.webp)

<br>

3.  Click **`Id:*********`** from the displayed information to copy it.  
![userinfobot-id | w-600](res/rendertracker/telegram-userinfo-copyid.webp)

---

## 2. Create a Telegram Bot and Get a Token

1.  Click the **`START BOT`** button at **[@BotFather](https://t.me/botfather)**.  
![botfather | w-400](res/rendertracker/telegram-botfather-web.webp)

<br>

2.  Click the **`Start`** button.  
![botfather-start | w-600](res/rendertracker/telegram-botfather-startbutton.webp)

<br>

3.  Type **`/newbot`** in the chat.  
![botfather-newbot | w-600](res/rendertracker/telegram-botfather-newbot.webp)

<br>

4.  Enter a name for your bot (e.g., **`RenderTracker`**).  
![botfather-newbot-name | w-600](res/rendertracker/telegram-botfather-name.webp)

<br>

5.  Enter a username for your bot (must end with `_bot`, e.g., **`rendertracker_bot`**).  
![botfather-newbot-username | w-600](res/rendertracker/telegram-botfather-username.webp)

<br>

6.  Click the **`token`** below **`Use this token to access the HTTP API:`** to copy it.  
Then click the bot chat room link at the top to open it.  
![botfather-newbot-token | w-600](res/rendertracker/telegram-botfather-link-token.webp)

<br>

7.  Click the **`Start`** button in the bot chat room.  
![botfather-newbot-start | w-600](res/rendertracker/telegram-botfather-botstart.webp)

<br>

![RenderTracker Profile Image | w-100](res/rendertracker/rendertracker-512x512-sharp.png)  
*RenderTracker profile image*

You can change the bot profile image at **`BotFather > Open > RenderTracker > Edit Info > Set New Photo`**.

---

## 3. Apply the Bot Token and Chat ID in RenderTracker

1.  Enable the **`Telegram icon`** in the top-right of the app.  
![telegram-activate-button | w-300](res/rendertracker/telegram-activate-button.webp)

<br>

2.  Click the **`gear icon`** in the top-right of the app.  
![click-settings-button | w-300](res/rendertracker/click-settings-button.webp)

<br>

3.  Enter the copied token and Chat ID into the **`Bot Token`** and **`Chat ID`** fields under the **`Telegram Bot`** section.  
![telegram-paste-bottoken-chatid | w-600](res/rendertracker/telegram-paste-bottoken-chatid.webp)

---

## 4. Verify Notifications

*   Click the **`Test Message`** button to verify the Telegram connection is working.  
![telegram-testmessage-button | w-600](res/rendertracker/telegram-testmessage-button.webp)
![telegram-testmessage | w-400](res/rendertracker/telegram-testmessage.webp)  
If you don't receive a notification, check that the **`Bot Token`** and **`Chat ID`** are correct, and that the **`Telegram icon`** in the top-right of the app is active (colored).  

---

## ⚠️ Notes
*   If your **`Bot Token`** or **`Chat ID`** is leaked, anyone can send messages to your bot. Keep them private.  

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
