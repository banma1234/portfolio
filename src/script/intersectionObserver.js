import { programmaticScroll } from "./smoothScrollAction";

const SECTION = document.querySelectorAll("section");
const ARTICLE = document.querySelectorAll("article");
const observedSection = new Map();

ARTICLE.forEach((article, index) => (article.dataset.index = index));
SECTION.forEach((section, index) => {
  section.dataset.index = index;
  observedSection.set(section.id, false);
});
console.log(observedSection);

/**
 * 각 section의 뷰포트 진입 감지하는 함수.
 * 뷰포트 내에 진입시 콜백 `onSectionWatched` 실행
 * @param {void} onSectionWatched
 */
export function initializeObserver(onSectionWatched) {
  let watchedIndex = 0; // 현재 감지중인 section의 index 번호

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // entry.target.dataset.index의 return값은 `string`이다
        const index = Number(entry.target.dataset.index);

        if (entry.isIntersecting) {
          watchedIndex = index;
          ARTICLE[watchedIndex].classList.add("watched");
          SECTION[watchedIndex].classList.add("watched");
          observedSection.set(SECTION[watchedIndex].id, true);

          // 콜백 호출
          if (onSectionWatched) {
            onSectionWatched(entry.target.id, true);
          }
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
    { threshold: 0.5 }
  );

  // 각 section 감지 수행
  SECTION.forEach((section) => observer.observe(section));
  ARTICLE.forEach((article) => observer.observe(article));
}

export function scrollToSection() {
  const MENU = document.querySelectorAll("#nav__menu > li");

  MENU.forEach((item, i) => {
    item.addEventListener("click", async () => {
      await programmaticScroll(SECTION[i + 1], observedSection);
    });
  });
}
