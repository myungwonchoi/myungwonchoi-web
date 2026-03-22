# ![discord | w-icon](res/rendertracker/discord.svg) 디스코드 Webhook 설정 가이드

디스코드 채널로 RenderTracker 알림을 받는 방법을 안내합니다.  
PC에 디스코드가 설치되어 있어야 합니다.

---

## 1. 디스코드 Webhook URL 생성

1.  디스코드 서버 이름을 클릭하여 서버 설정을 클릭합니다. 또는 서버 채널 우측의 톱니바퀴를 클릭합니다.  
(나만의 서버를 만들거나, 디스코드 서버를 관리할 수 있는 권한이 필요합니다.)  
![discord-serversettings | w-300](res/rendertracker/discord-serversettings.webp)
![discord-channelsettings | w-300](res/rendertracker/discord-channelsettings.webp)

<br>

2.  왼쪽 메뉴에서 **[연동]** 탭을 클릭 후 **[웹후크 만들기]** 버튼을 클릭합니다.  
![discord-link | w-1000](res/rendertracker/discord-link.webp)

<br>

3.  **[이름]** 과 **[채널]** 을 입력 후 **[웹후크 URL 복사]** 버튼을 클릭하여 복사합니다.  
![discord-link-copy | w-1000](res/rendertracker/discord-link-copy.webp)
    *   **이름**: Webhook 이름 (예: `RenderTracker`)  
    *   **채널**: 알림을 보낼 채널

---

## 2. RenderTracker에서 디스코드 Webhook URL 적용

1.  앱 우측 상단의 **[디스코드 아이콘]** 을 활성화합니다.  
![discord-activate-discord-button | w-300](res/rendertracker/discord-activate-discord-button.webp)

<br>

2.  앱 우측 상단의 **[톱니바퀴 아이콘]** 을 클릭합니다.  
![click-settings-button | w-300](res/rendertracker/click-settings-button.webp)

<br>

3.  **[디스코드 Webhook]** 섹션의 **[Webhook URL]** 칸에 복사한 주소를 붙여넣습니다.  
![discord-paste-webhookurl | w-600](res/rendertracker/discord-paste-webhookurl.webp)
<br>

---

## 3. 알림 확인

*   **[테스트 메시지]** 버튼을 클릭하여 디스코드가 올바르게 연결됐는지 확인할 수 있습니다.  
![discord-testmessage-button | w-600](res/rendertracker/discord-testmessage-button.webp)  
![discord-testmessage | w-400](res/rendertracker/discord-testmessage.webp)  
알림이 오지 않으면 Webhook URL이 올바른지 확인하거나, 앱 상단의 **[디스코드 아이콘]**이 활성화(컬러) 상태인지 확인하세요.

---

## ⚠️ 주의사항
*   모바일 디스코드는 알림이 실시간으로 작동하지 않으므로 수동 확인이 필요합니다.  
    (텔레그램을 사용하시는 것을 권장합니다.)

*   컴퓨터에 디스코드가 켜져있으면 모바일에 디스코드 알림이 오지 않습니다.  
    (텔레그램을 사용하시는 것을 권장합니다.)

*   Webhook URL이 유출되면 누구나 메시지를 보낼 수 있으니 타인에게 노출되지 않도록 주의하세요.

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
