document.addEventListener("DOMContentLoaded", () => {
  let currentScroll = 0; // 현재 스크롤 위치
  let targetScroll = 0; // 목표 스크롤 위치
  const scrollSpeed = 0.1; // 부드럽게 스크롤하는 속도
  let debounceTimeout;

  // 스크롤 이벤트로 목표 위치 업데이트
  window.addEventListener(
    "wheel",
    event => {
      event.preventDefault();
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        targetScroll += event.deltaY;
        targetScroll = Math.max(
          0,
          Math.min(
            targetScroll,
            document.body.scrollHeight - window.innerHeight,
          ),
        );
      }, 10);
    },
    { passive: false },
  );

  // 스크롤 애니메이션
  function smoothScroll() {
    currentScroll += (targetScroll - currentScroll) * scrollSpeed; // 부드럽게 목표로 이동
    window.scrollTo(0, currentScroll); // 화면 스크롤
    requestAnimationFrame(smoothScroll); // 재귀 호출
  }

  smoothScroll(); // 초기 호출
});
