import { initializeObserver, scrollToSection } from "./intersectionObserver";
import { smoothScrollAction } from "./smoothScrollAction";
import handleSectionWatched from "./animation";

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

  // 인트로 제어
  showIntro().then(() => {
    smoothScrollAction(); // 부드러운 스크롤
  });
});

/** global.js 내에서 전역적으로 사용되는 `body` element. */
const BODY = document.getElementsByTagName("body")[0];

/**
 * `프로젝트` 페이지의 `캐러셀`을 제어하는 함수.
 * @type {void}
 */
function handleCarrousel() {
  let count = 0;
  const CAROUSEL = document.querySelectorAll(".carousel");

  function changeImage(index) {
    CAROUSEL.forEach((item) => {
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
  const modal = document.querySelector(".modal");
  const modalBody = document.querySelector("#modal_body > img");
  const modalClose = document.getElementById("modal_close");
  const IMAGES = document.querySelectorAll("#target__img");

  // `IMAGES`의 자식 element에 모달창 여는 이벤트 등록
  IMAGES.forEach((img) => {
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

/**
 * `디자인` 페이지의 `벨트` 컴포넌트 애니메이션 제어.
 * 대상 element의 `복제(clone)` 생성 후 원본 뒤에 이어 붙이는 기능을 수행.
 * @type {void}
 */
function animateDesignBelt() {
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
}

/**
 * 약 4초가량의 인트로를 실행하는 함수. 다음과 같은 기능을 수행한다.
 * - 인트로 애니메이션 실행
 * - 인트로가 끝난 후 부드러운 스크롤 이벤트 실행
 * @type {Promise<void>}
 */
async function showIntro() {
  const intro = document.getElementById("intro");
  const info = document.querySelector(".intro__info");
  const list = document.querySelector(".intro__list > ul");

  /**
   * 입력받은 시간만큼 딜레이 주는 함수.
   * @param {number} time
   * @returns {Promie<void>}
   */
  function delay(time) {
    return new Promise((res) => setTimeout(res, time));
  }

  // 1초에 한번씩 총 3회 애니메이션 수행
  async function animateByDelay() {
    for (let i = 0; i < 3; i++) {
      list.style.transform = `translateY(${2.8 * i}rem)`;
      await delay(1000);
    }
  }

  /**
   * - 문서 로드 후 처음 1초간 초기 인트로 내용 출력
   * - 이후 `animateByDelay()` 실행, 함수 종료시 스크롤락 해제
   */
  await new Promise((resolve) => {
    setTimeout(() => {
      info.style.opacity = "1";
      BODY.classList.add("scrollLock");

      animateByDelay().then(() => {
        BODY.classList.remove("scrollLock");
        intro.style.transform = `translateY(-100%)`;

        resolve();
      });
    }, 1000);
  });
}
