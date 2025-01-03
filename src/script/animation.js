/**
 * 뷰포트 내에 진입한 `section`의 각 컴포넌트에 대하여 지정된 애니메이션 수행.
 * @param {string} sectionId
 * @param {boolean} isWatched
 */
export default function handleSectionWatched(sectionId, isWatched) {
  // `sectionId`의 값에 따라 분기
  switch (sectionId) {
    case "section__about":
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

    case "section__develop__1":
      const INFO_1 = document.querySelector("#project__1 > .develop__form");

      if (isWatched) {
        INFO_1.style.opacity = "1";
        INFO_1.style.transform = "translateX(-3rem)";
      }
      break;

    case "section__develop__2":
      const INFO_2 = document.querySelector("#project__2 > .develop__form");

      if (isWatched) {
        INFO_2.style.opacity = "1";
        INFO_2.style.transform = "translateX(-3rem)";
      }
      break;
  }
}
