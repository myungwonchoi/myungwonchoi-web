# ![telegram | w-icon](res/rendertracker/telegram.svg) 텔레그램 Bot 설정 가이드

텔레그램 봇으로 RenderTracker 알림을 받는 방법을 안내합니다.  
PC에 텔레그램이 설치되어 있어야 합니다.

---

## 1. 내 고유 ID(Chat ID) 확인

1.  **[@userinfobot](https://t.me/userinfobot)** 링크에서 **[START BOT]** 버튼을 클릭합니다.

    ![userinfobot | w-400](res/rendertracker/telegram-userinfo-web.webp)

<br>

2.  하단의 **[시작(Start)]** 버튼을 클릭합니다.

    ![userinfobot-start | w-600](res/rendertracker/telegram-userinfo-startbutton.webp)

<br>

3.  나타나는 정보 중 **`Id:*********`** 를 클릭하여 복사합니다.

    ![userinfobot-id | w-600](res/rendertracker/telegram-userinfo-copyid.webp)

---

## 2. RenderTracker 봇 생성 (Token 발급)

1.  **[@BotFather](https://t.me/botfather)** 링크에서 **[START BOT]** 버튼을 클릭합니다.

    ![botfather | w-400](res/rendertracker/telegram-botfather-web.webp)

<br>

2.  채팅창에 **`/newbot`** 을 입력합니다.

    ![botfather-newbot | w-600](res/rendertracker/telegram-botfather-newbot.webp)

<br>

3.  봇 이름을 입력합니다. (예: **`RenderTracker`**)

    ![botfather-newbot-name | w-600](res/rendertracker/telegram-botfather-name.webp)

<br>

4.  봇 username을 입력합니다. (반드시 `_bot`으로 끝나야 합니다, 예: **`rendertracker_bot`**)

    ![botfather-newbot-username | w-600](res/rendertracker/telegram-botfather-username.webp)

<br>

5.  성공 메시지 하단에서 **`Use this token ~`** 뒤의 **`token`** 을 클릭하여 복사합니다.  
상단의 봇 채팅방 주소를 클릭하여 봇 채팅방으로 이동합니다.  

    ![botfather-newbot-token | w-600](res/rendertracker/telegram-botfather-link-token.webp)

<br>

6.  봇 채팅방에서 **[시작]** 버튼을 클릭합니다.

    ![botfather-newbot-start | w-600](res/rendertracker/telegram-botfather-botstart.webp)

---

## 3. RenderTracker 앱 적용

1.  앱 상단의 **텔레그램 아이콘**을 활성화합니다.

2.  앱 우측 상단의 **톱니바퀴 아이콘**을 클릭합니다.

3.  **[텔레그램 Bot]** 섹션의 **[Bot Token]** 과 **[Chat ID]** 칸에 복사한 정보 각각 입력합니다.

---


## 4. 알림 확인

*   렌더링 시작 시 텔레그램 봇 채널로 알림이 전송됩니다.

*   알림이 오지 않으면 **Bot Token**과 **Chat ID**가 올바른지 확인하거나, 앱 상단의 **텔레그램 아이콘**이 활성화(컬러) 상태인지 확인하세요.

---

## ⚠️ 주의사항
*   발급받은 **Bot Token**과 **Chat ID**는 타인에게 노출되지 않도록 주의하세요.
