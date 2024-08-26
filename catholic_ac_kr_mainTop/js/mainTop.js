const mainTop_section1 = () => {
  const videoDelete = get("#main_top .mainVideoBox .mainVideoUl a");
  videoDelete.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.remove();
  });
  let currentSlide = 0,
    newSlide;
  const btnPrev = get(
    "#main_top .section_1 .mainSlider .mainSliderControl .prevBtn"
  );
  const btnNext = get(
    "#main_top .section_1 .mainSlider .mainSliderControl .nextBtn"
  );
  const btnPause = get(
    "#main_top .section_1 .mainSlider .mainSliderControl .pauseBtn"
  );
  const mainSlideNext = () => {
    const ani_Out = [
      { transform: "translateX(0)" },
      { transform: "translateX(-100%)" },
    ];
    const ani_In = [
      { transform: "translateX(100%)" },
      { transform: "translateX(0)" },
    ];
    const options = {
      duration: 700,
      easing: "ease-in-out",
      fill: "forwards",
    };
    //next slide
    newSlide = currentSlide + 1;
    if (currentSlide === 3) newSlide = 0;
    const slider = get("#main_top .mainSlider");
    const progress = get(
      "#main_top .section_1 .mainSlider .mainSliderControl progress"
    );
    slider.children[currentSlide].classList.remove("hide");
    slider.children[newSlide].classList.remove("hide");
    slider.children[currentSlide].animate(ani_Out, options);
    slider.children[newSlide].animate(ani_In, options);
    console.log((newSlide + 1) * 25);
    progress.value = (newSlide + 1) * 25;
    if (currentSlide === 3) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
  };

  btnNext.addEventListener("click", mainSlideNext);
  const mainSlider = setInterval(mainSlideNext, 4000);
};
mainTop_section1();
