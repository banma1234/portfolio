/**
 * 뷰포트 내에 진입한 `section`의 각 컴포넌트에 대하여 지정된 애니메이션 수행.
 * @param {string} articleId
 * @param {boolean} isWatched
 * @type {void}
 */
export default function handleSectionWatched(articleId, isWatched) {
  // `articleId`의 값에 따라 분기
  switch (articleId) {
    // 뷰포트 `about`
    case "article__about":
      const [PROFILE, FORM] = document.querySelectorAll(
        ".about__profile, .about__form"
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
