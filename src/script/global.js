import { initializeObserver, scrollToSection } from "./intersectionObserver";
import { smoothScrollAction } from "./smoothScrollAction";
import {
  handleSectionWatched,
  handleNavBar,
  animateDesignBelt,
  showIntro,
} from "./animation";

/**
 * 문서 로드시 즉시 실행되는 스크립트. 다음과 같은 기능을 수행한다.
 * - 부드러운 스크롤 애니메이션
 * - 뷰포트 진입 감지 및 콜백 실행
 * - 모달창, 인트로 제어
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeObserver(handleSectionWatched); // 뷰포트 진입 감지
  scrollToSection(); // 스크롤 스크립트와 충돌하지 않는 scrollIntoView
  handleCarrousel(); // 캐러셀 제어
  handleModalPage(); // 모달창 제어
  animateDesignBelt(); // 디자인 페이지의 애니메이션 제어
  handleNavBar();

  // 인트로 제어
  showIntro().then(() => {
    smoothScrollAction(); // 부드러운 스크롤
  });
});

/**
 * `프로젝트` 페이지의 `캐러셀`을 제어하는 함수.
 * @type {void}
 */
function handleCarrousel() {
  let count = 0;
  const CAROUSEL = document.querySelectorAll(".carousel");

  function changeImage(index) {
    CAROUSEL.forEach(item => {
      item.style.transform = `translateX(-${260 * index}px)`;
    });
  }

  setInterval(() => {
    count === 2 ? (count = 0) : count++;
    changeImage(count);
  }, 4000);
}

/**
 * 글로벌 모달창을 제어하는 함수.
 * @type {void}
 */
function handleModalPage() {
  const BODY = document.getElementsByTagName("body")[0];
  const modal = document.querySelector(".modal");
  const modalBody = document.querySelector("#modal_body > img");
  const modalClose = document.getElementById("modal_close");
  const IMAGES = document.querySelectorAll("#target__img");

  // `IMAGES`의 자식 element에 모달창 여는 이벤트 등록
  IMAGES.forEach(img => {
    img.addEventListener("click", () => {
      BODY.classList.add("scrollLock");
      modal.classList.add("activate");
      setTimeout(() => {
        modalBody.src = img.src;
      }, 600);
    });
  });

  // 모달창 닫는 이벤트 등록
  modalClose.addEventListener("click", () => {
    modalBody.src = "";
    modal.classList.remove("activate");
    BODY.classList.remove("scrollLock");
  });
}
