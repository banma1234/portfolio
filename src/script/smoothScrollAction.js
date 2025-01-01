let currentScroll = 0; // 현재 스크롤 위치
let targetScroll = 0; // 목표 스크롤 위치
const scrollSpeed = 0.1; // 스크롤 속도 제어

let debounceTimeout;

// 스크롤 이벤트로 현재 스크롤 위치 목표 위치로 업데이트
window.addEventListener(
  "wheel",
  event => {
    event.preventDefault();
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      targetScroll += event.deltaY;
      targetScroll = Math.max(
        0,
        Math.min(targetScroll, document.body.scrollHeight - window.innerHeight),
      );
    }, 10);
  },
  { passive: false },
);

/**
 * 부드러운 스크롤 애니메이션을 수행하는 함수. 현재 스크롤 위치를
 * 사용자 지정 스크롤 속도 `scrollSpeed`에 맞게 지속적으로 업데이트한다.
 */
export default function smoothScrollAction() {
  currentScroll += (targetScroll - currentScroll) * scrollSpeed; // 부드럽게 목표로 이동
  window.scrollTo(0, currentScroll); // 화면 스크롤

  // 반복해서 smoothScroll 함수 호출
  requestAnimationFrame(smoothScrollAction);
}
