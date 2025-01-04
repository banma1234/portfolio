let currentScroll = 0; // 현재 스크롤 위치
let targetScroll = 0; // 목표 스크롤 위치
const scrollSpeed = 0.08; // 스크롤 속도 제어
let isProgrammaticScroll = false; // scrollIntoView 동작 감지

// 휠 스크롤 이벤트로 목표 위치 업데이트
window.addEventListener(
  "wheel",
  (event) => {
    if (isProgrammaticScroll) return; // scrollIntoView 중단 중에는 무시

    event.preventDefault(); // 기본 휠 스크롤 동작 차단
    targetScroll += event.deltaY;
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );
  },
  { passive: false }
);

// 부드러운 스크롤 애니메이션
export function smoothScrollAction() {
  if (!isProgrammaticScroll) {
    currentScroll += (targetScroll - currentScroll) * scrollSpeed;
    window.scrollTo(0, currentScroll);
  } else {
    // scrollIntoView가 끝난 후 위치 동기화
    currentScroll = window.scrollY;
    targetScroll = window.scrollY;
  }

  requestAnimationFrame(smoothScrollAction);
}

// scrollIntoView 호출시 사용
export async function programmaticScroll(element, observedSection) {
  // 스크롤 시작
  console.log("start");
  isProgrammaticScroll = true;
  element.scrollIntoView({ behavior: "smooth" });

  // IntersectionObserver 상태로 스크롤 완료 감지
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (observedSection.get(element.id)) {
        // "watched" 상태가 되면 완료로 간주
        setTimeout(() => {
          clearInterval(interval);
          resolve();
        }, 700);
      }
    }, 50); // 50ms 간격으로 상태 확인
  });

  console.log("done!");
  console.log(observedSection);
  isProgrammaticScroll = false;
}
