import { programmaticScroll } from "./smoothScrollAction";

/** 문서 내 모든 `section` element @type {NodeListOf<HTMLElement>} */
const SECTION = document.querySelectorAll("section");
/** 문서 내 모든 `article` element @type {NodeListOf<HTMLElement>} */
const ARTICLE = document.querySelectorAll("article");
/**
 * 각 `section` element의 `상태` 저장하는 `Map`
 * @type {Map<HTMLElement, boolean>}
 */
const observedSection = new Map();

/**
 * 각 `section`과 `article`에 index 번호 부여.
 */
ARTICLE.forEach((article, index) => (article.dataset.index = index));
SECTION.forEach((section, index) => {
  section.dataset.index = index;
  observedSection.set(section.id, false);
});

/**
 * 각 section의 뷰포트 진입 감지하는 함수.
 * 뷰포트 내에 진입시 콜백 `onSectionWatched` 실행
 * @param {void} onSectionWatched 뷰포트 내에 진입시 실행할 콜백 함수.
 */
export function initializeObserver(onSectionWatched) {
  let watchedIndex = 0; // 현재 감지중인 section의 index 번호

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        // entry.target.dataset.index의 return값은 `string`이다
        const index = Number(entry.target.dataset.index);

        // 뷰포트 내에 진입시 수행
        if (entry.isIntersecting) {
          watchedIndex = index;
          ARTICLE[watchedIndex].classList.add("watched");
          SECTION[watchedIndex].classList.add("watched");
          observedSection.set(SECTION[watchedIndex].id, true);

          // 콜백 호출
          if (onSectionWatched) {
            onSectionWatched(entry.target.id, true);
          }
          // 뷰포트 밖을 벗어났을시 수행
        } else if (entry.boundingClientRect.y > 100) {
          ARTICLE[watchedIndex].classList.remove("watched");
          SECTION[watchedIndex].classList.remove("watched");
          observedSection.set(SECTION[watchedIndex].id, false);
          watchedIndex = index - 1;

          // 콜백 호출
          if (onSectionWatched) {
            onSectionWatched(entry.target.id, false);
          }
        }
      });
    },
    { threshold: 0.5 },
  );

  // 각 section, article 감지 수행
  SECTION.forEach(section => observer.observe(section));
  ARTICLE.forEach(article => observer.observe(article));
}

/**
 * `nav__menu`의 자식 element에 `programmaticScroll()` 매핑.
 */
export function scrollToSection() {
  const MENU = document.querySelectorAll("#nav__menu > li");

  MENU.forEach((item, i) => {
    item.addEventListener("click", async () => {
      await programmaticScroll(SECTION[i + 1], observedSection);
    });
    item.addEventListener("keydown", async event => {
      if (event.key === "Enter") {
        await programmaticScroll(SECTION[i + 1], observedSection);
      }
    });
  });
}
