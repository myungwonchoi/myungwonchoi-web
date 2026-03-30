# RenderTracker 소개

> [RenderTracker](https://ddingone.gumroad.com/l/RenderTracker)는 3D 소프트웨어(Cinema 4D, Blender)의 렌더링 진행 상황을 실시간으로 모니터링하고,
> 메신저(디스코드, 텔레그램)로 알림을 전송하는 프로그램입니다.  
>
> `Blender 4.0` 이상, `Cinema 4D R2023` 이상을 지원합니다.

---
![guide-mainui | w-800](res/rendertracker/guide-mainui.webp)
#### 왼쪽 패널  
렌더링한 파일들의 기록이 표시됩니다.
항목을 클릭하면 렌더링 기록들을 확인할 수 있습니다.

<br>

#### 오른쪽 패널  
현재 프로젝트 파일에 대한 렌더 정보와 상태가 표시됩니다. 하단 패널에서 렌더링 시간 관련 정보를 확인할 수 있습니다.

<br>

#### 우측 상단 버튼  
왼쪽부터 메신저 알림, 앱 볼륨, 앱 전체 알림, 설정 버튼입니다.

---

## 알림

렌더링 상태가 업데이트될 때 화면 우측 하단에 알림이 표시됩니다.

<table><tr>
<td>

**렌더링 시작**  
렌더링이 시작되면 알립니다.
![guide-popup-start | w-400](res/rendertracker/guide-popup-start.webp)

</td>
<td>

**렌더링 완료**  
렌더링이 완료되면 알립니다.
![guide-popup-finish | w-400](res/rendertracker/guide-popup-finish.webp)

</td>
</tr><tr>
<td>

**렌더링 중지**
렌더링이 중간에 중지되면 중지 시점의 정보를 알립니다.

![guide-popup-stop](res/rendertracker/guide-popup-stop.webp)

*3D프로그램이 응답없음이거나 종료돼도 여전히 감지합니다.*

</td>
<td>

**프레임 지연**
특정 프레임이 설정된 시간 이상 소요될 경우 알립니다.

![guide-popup-delay](res/rendertracker/guide-popup-delay.webp)

*3D프로그램이 응답없음이거나 종료돼도 여전히 감지합니다.*

</td>
</tr></table>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
