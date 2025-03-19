/** 현재 스크롤 위치 @type {number} */
let currentScroll = 0;
/** 목표 스크롤 위치 @type {number} */
let targetScroll = 0;
/** 스크롤 속도 제어 @type {number} */
const scrollSpeed = 0.08;
/** `scrollIntoView()` 함수 제어하는 플래그
 * - `true` : 임의의 javascript로 스크롤을 제어하는 경우
 * - `false` : 브라우저에서의 일반적인 스크롤 이벤트
 * @type {boolean}
 */
let isProgrammaticScroll = false;

window.addEventListener("keydown", event => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    isProgrammaticScroll = true;
  }
});
window.addEventListener("keyup", event => {
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    isProgrammaticScroll = false;
  }
});

// 휠 스크롤 이벤트로 목표 위치 업데이트
window.addEventListener(
  "wheel",
  event => {
    if (isProgrammaticScroll) return; // scrollIntoView 중단 중에는 무시

    event.preventDefault(); // 기본 휠 스크롤 동작 차단
    targetScroll += event.deltaY;
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight),
    );
  },
  { passive: false },
);

/**
 * 상황에 맞게 스크롤을 제어하는 함수. @type {void}
 */
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

/**
 * `scrollIntoView()`의 대체함수. 부드러운 스크롤을 중지하고
 * 타겟 element가 `뷰포트` 내에 진입할때까지 스크롤 이동.
 * @param {HTMLElement} element 타겟 element
 * @param {Map<HTMLElement, boolean>} observedSection 뷰포트 진입여부 판별. `observedSection` 참고.
 * @type {Promise<void>}
 */
export async function programmaticScroll(element, observedSection) {
  isProgrammaticScroll = true;
  element.scrollIntoView({ behavior: "smooth" });

  /**
   * `IntersectionObserver` 이용해 뷰포트 진입 및 스크롤 완료 감지
   * 스크롤이 정상적으로 완료시 return.
   */
  await new Promise(resolve => {
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

  isProgrammaticScroll = false;
}
