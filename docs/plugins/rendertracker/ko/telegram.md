# 텔레그램 Bot 설정 가이드

> 텔레그램 봇으로 RenderTracker 알림을 받는 방법을 안내합니다.  
> PC에 텔레그램이 설치되어 있어야 합니다.  

![telegram-message | w-500](res/rendertracker/telegram-message.webp)

---
## 1. Chat ID 확인

1.  **[@userinfobot](https://t.me/userinfobot)** 링크에서 **`START BOT`** 버튼을 클릭합니다.  
![userinfobot | w-400](res/rendertracker/telegram-userinfo-web.webp)

<br>

2.  하단의 **`시작`** 버튼을 클릭합니다.  
![userinfobot-start | w-600](res/rendertracker/telegram-userinfo-startbutton.webp)

<br>

3.  나타나는 정보 중 **`Id:*********`** 를 클릭하여 복사합니다.  
![userinfobot-id | w-600](res/rendertracker/telegram-userinfo-copyid.webp)

---

## 2. 텔레그램 봇 생성 및 Token 발급

1.  **[@BotFather](https://t.me/botfather)** 링크에서 **`START BOT`** 버튼을 클릭합니다.  
![botfather | w-400](res/rendertracker/telegram-botfather-web.webp)

<br>

2.  **`시작`** 버튼을 클릭합니다.  
![botfather-start | w-600](res/rendertracker/telegram-botfather-startbutton.webp)

<br>

3.  채팅창에 **`/newbot`** 을 입력합니다.  
![botfather-newbot | w-600](res/rendertracker/telegram-botfather-newbot.webp)

<br>

4.  봇 이름을 입력합니다. (예: **`RenderTracker`**)  
![botfather-newbot-name | w-600](res/rendertracker/telegram-botfather-name.webp)

<br>

5.  봇 username을 입력합니다. (반드시 `_bot`으로 끝나야 합니다, 예: **`rendertracker_bot`**)  
![botfather-newbot-username | w-600](res/rendertracker/telegram-botfather-username.webp)

<br>

6. **`Use this token to access the HTTP API:`** 하단의 **`token`** 을 클릭하여 복사합니다.  
상단 봇 채팅방 주소를 클릭하여 봇 채팅방으로 이동합니다.  
![botfather-newbot-token | w-600](res/rendertracker/telegram-botfather-link-token.webp)

<br>

7.  이동한 봇 채팅방에서 **`시작`** 버튼을 클릭합니다.  
![botfather-newbot-start | w-600](res/rendertracker/telegram-botfather-botstart.webp)

<br>

![RenderTracker 프로필 이미지 | w-100](res/rendertracker/rendertracker-512x512-sharp.png)  
*RenderTracker 프로필 이미지*

**`BotFather > Open > RenderTracker > Edit Info > Set New Photo`** 에서 봇 프로필 이미지를 변경할 수 있습니다.

---

## 3. RenderTracker에서 텔레그램 봇 토큰 및 Chat ID 적용

1.  앱 우측 상단의 **`텔레그램 아이콘`** 을 활성화합니다.  
![telegram-activate-button | w-300](res/rendertracker/telegram-activate-button.webp)

<br>

2.  앱 우측 상단의 **`톱니바퀴 아이콘`** 을 클릭합니다.  
![click-settings-button | w-300](res/rendertracker/click-settings-button.webp)

<br>

3.  **`텔레그램 Bot`** 섹션의 **`Bot Token`** 과 **`Chat ID`** 칸에 복사한 정보를 각각 입력합니다.  
![telegram-paste-bottoken-chatid | w-600](res/rendertracker/telegram-paste-bottoken-chatid.webp)

---


## 4. 알림 확인

*   **`테스트 메시지`** 버튼을 클릭하여 텔레그램에 올바르게 연결됐는지 확인할 수 있습니다.  
![telegram-testmessage-button | w-600](res/rendertracker/telegram-testmessage-button.webp)  
![telegram-testmessage | w-400](res/rendertracker/telegram-testmessage.webp)  
알림이 오지 않으면 **`Bot Token`** 과 **`Chat ID`** 가 올바른지 확인하거나, 앱 우측 상단의 **`텔레그램 아이콘`** 이 활성화(컬러) 상태인지 확인하세요.

---

## ⚠️ 주의사항
*   **`Bot Token`** 과 **`Chat ID`** 는 유출되면 누구나 메시지를 보낼 수 있으니 타인에게 노출되지 않도록 주의하세요.

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>