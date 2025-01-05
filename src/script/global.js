import { initializeObserver, scrollToSection } from "./intersectionObserver";
import { smoothScrollAction } from "./smoothScrollAction";
import handleSectionWatched from "./animation";

/**
 * 문서 로드시 즉시 실행되는 스크립트. 다음과 같은 기능을 수행한다.
 * - 부드러운 스크롤 애니메이션
 * - 뷰포트 진입 감지 및 콜백 실행
 */
document.addEventListener("DOMContentLoaded", () => {
  smoothScrollAction(); // 부드러운 스크롤
  initializeObserver(handleSectionWatched); // 뷰포트 진입 감지
  scrollToSection();
  setTargetImage();
});

// #region 캐러셀 제어 구문
let count = 0;
const CAROUSEL = document.querySelectorAll(".carousel");

function changeImage(idx) {
  CAROUSEL.forEach(item => {
    item.style.transform = `translateX(-${260 * idx}px)`;
  });
}

setInterval(() => {
  count === 2 ? (count = 0) : count++;
  changeImage(count);
}, 3000);
//#endregion

// #region modal 제어 구문
const body = document.getElementsByTagName("body")[0];
const modal = document.querySelector(".modal");
const modalBody = document.querySelector("#modal_body > img");
const modalClose = document.getElementById("modal_close");

function setTargetImage() {
  const IMAGES = document.querySelectorAll("#target__img");

  IMAGES.forEach(img => {
    img.addEventListener("click", () => {
      body.classList.add("scrollLock");
      modal.classList.add("activate");
      setTimeout(() => {
        modalBody.src = img.src;
      }, 600);
    });
  });
}

modalClose.addEventListener("click", () => {
  modalBody.src = "";
  modal.classList.remove("activate");
  body.classList.remove("scrollLock");
});
//#endregion

const belt = document.querySelector(".belt__container");

const clone = belt.cloneNode(true);

document.querySelector(".belt").appendChild(clone);
document.querySelector(".belt__container").offsetWidth + "px";

belt.classList.add("original");
clone.classList.add("clone");

const belt__slow = document.querySelector(".belt__slow__container");
const clone_2 = belt__slow.cloneNode(true);

document.querySelector(".belt__slow").appendChild(clone_2);
document.querySelector(".belt__slow__container").offsetWidth + "px";

belt__slow.classList.add("original");
clone_2.classList.add("clone");
