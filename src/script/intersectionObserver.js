const SECTION = document.querySelectorAll("#main > section");
SECTION.forEach((section, index) => (section.dataset.index = index));

/**
 * 각 section의 뷰포트 진입 감지하는 함수.
 * 뷰포트 내에 진입시 콜백 `onSectionWatched` 실행
 * @param {void} onSectionWatched
 */
export function initializeObserver(onSectionWatched) {
  let watchedIndex = 0; // 현재 감지중인 section의 index 번호

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        // entry.target.dataset.index의 return값은 `string`이다
        const index = Number(entry.target.dataset.index);

        if (entry.isIntersecting) {
          watchedIndex = index;
          SECTION[watchedIndex].classList.add("watched");

          // 콜백 호출
          if (onSectionWatched) {
            onSectionWatched(entry.target.id, true);
          }
        } else if (entry.boundingClientRect.y > 100) {
          SECTION[watchedIndex].classList.remove("watched");
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

  // 각 section 감지 수행
  SECTION.forEach(section => observer.observe(section));
}

export function scrollToSection() {
  const MENU = document.querySelectorAll("#nav__menu > li");

  MENU.forEach((item, i) => {
    item.addEventListener("click", () => {
      console.log(SECTION[i + 1]);
      SECTION[i + 1].scrollIntoView({ behavior: "smooth" });
    });
  });
}
