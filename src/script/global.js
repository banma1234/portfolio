import initializeObserver from "./intersectionObserver";
import smoothScrollAction from "./smoothScrollAction";
import handleSectionWatched from "./animation";

/**
 * 문서 로드시 즉시 실행되는 스크립트. 다음과 같은 기능을 수행한다.
 * - 부드러운 스크롤 애니메이션
 * - 뷰포트 진입 감지 및 콜백 실행
 */
document.addEventListener("DOMContentLoaded", () => {
  smoothScrollAction(); // 부드러운 스크롤
  initializeObserver(handleSectionWatched); // 뷰포트 진입 감지
});

let count = 0;
const CAROUSEL = document.querySelectorAll(".carousel");

function changeImage(idx) {
  CAROUSEL.forEach((item) => {
    item.style.transform = `translateX(-${260 * idx}px)`;
  });
}

setInterval(() => {
  count === 2 ? (count = 0) : count++;
  changeImage(count);
}, 3000);
