import { SVG } from "./customComponents";

/**
 * 뷰포트 내에 진입한 `section`의 각 컴포넌트에 대하여 지정된 애니메이션 수행.
 * @param {string} articleId
 * @param {boolean} isWatched
 * @type {void}
 */
export function handleSectionWatched(articleId, isWatched) {
  // `articleId`의 값에 따라 분기
  switch (articleId) {
    // 뷰포트 `about`
    case "article__about":
      const [PROFILE, FORM] = document.querySelectorAll(
        ".about__profile, .about__form",
      );

      if (isWatched) {
        PROFILE.style.opacity = "1";
        PROFILE.style.transform = "translateY(-6rem)";
        setTimeout(() => {
          FORM.style.opacity = "1";
          FORM.style.transform = "translateY(-6rem)";
        }, 500);
      }
      break;

    // 뷰포트 `develop__1`
    case "article__develop__1":
      const DEVELOP_1 = document.querySelector("#project__1 > .develop__form");

      if (isWatched) {
        DEVELOP_1.style.opacity = "1";
        DEVELOP_1.style.transform = "translateX(-3rem)";
      }
      break;

    // 뷰포트 `develop__2`
    case "article__develop__2":
      const DEVELOP_2 = document.querySelector("#project__2 > .develop__form");

      if (isWatched) {
        DEVELOP_2.style.opacity = "1";
        DEVELOP_2.style.transform = "translateX(-3rem)";
      }
      break;

    // 뷰포트 `design`
    case "article__design":
      const DESIGN = document.querySelector(".design__form");

      if (isWatched) {
        DESIGN.style.opacity = "1";
        DESIGN.style.transform = "translateY(-3rem)";
      }
      break;

    default:
      return;
  }
}

/**
 * `디자인` 페이지의 `벨트` 컴포넌트 애니메이션 제어.
 * 대상 element의 `복제(clone)` 생성 후 원본 뒤에 이어 붙이는 기능을 수행.
 * @type {void}
 */
export function animateDesignBelt() {
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
export async function showIntro() {
  const BODY = document.getElementsByTagName("body")[0];
  const intro = document.getElementById("intro");
  const info = document.querySelector(".intro__info");
  const list = document.querySelector(".intro__list > ul");

  /**
   * 입력받은 시간만큼 딜레이 주는 함수.
   * @param {number} time
   * @returns {Promie<void>}
   */
  function delay(time) {
    return new Promise(res => setTimeout(res, time));
  }

  // 1초에 한번씩 총 3회 애니메이션 수행
  async function animateByDelay() {
    for (let i = 0; i < 3; i++) {
      list.style.transform = `translateY(${2.8 * i}rem)`;
      await delay(55);
    }
  }

  /**
   * - 문서 로드 후 처음 1초간 초기 인트로 내용 출력
   * - 이후 `animateByDelay()` 실행, 함수 종료시 스크롤락 해제
   */
  await new Promise(resolve => {
    setTimeout(() => {
      info.style.opacity = "1";
      BODY.classList.add("scrollLock");

      animateByDelay().then(() => {
        BODY.classList.remove("scrollLock");
        intro.style.transform = `translateY(-100%)`;

        resolve();
      });
    }, 55);
  });
}

/**
 * 네비게이션 바의 반응형 애니메이션 제어하는 함수.
 */
export function handleNavBar() {
  const menu = document.getElementById("nav__menu");
  const button = document.getElementById("nav__menu__button");
  const buttonIcon = document.querySelector("#nav__menu__button > svg");
  let isClick = false;

  button.addEventListener("click", () => {
    isClick = !isClick;

    if (isClick) {
      menu.classList.add("__opened");
      menu.style.transform = "translateX(100%)";
      buttonIcon.innerHTML = `${SVG.cancel}`;

      setTimeout(() => {
        menu.style.transform = "translateX(0%)";
      }, 300);
    } else {
      menu.style.transform = "translateX(100%)";
      buttonIcon.innerHTML = `${SVG.menu}`;

      setTimeout(() => {
        menu.classList.remove("__opened");
        menu.style.transform = "translateX(0%)";
      }, 300);
    }
  });
}
