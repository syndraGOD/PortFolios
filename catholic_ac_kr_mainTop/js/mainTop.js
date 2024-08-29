const mainTop_section1 = () => {
  const videoDelete = get("#main_top .mainVideoBox .mainVideoUl a");
  videoDelete.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.remove();
  });
  //naviColor
  // const hdr = het("#main_top #header")
  // const hdr_btm = get("#main_top #header .hdr-btm-box")

  // hdr_btm.addEventListener('mouseover', )

  //mainSlide

  const slideSystem = () => {};
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
    // console.log((newSlide + 1) * 25);
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

// let options = {
//   method: method ? method.toUpperCase() : 'GET',
//   headers: {
//       'Content-Type': 'application/json',
//       Authorization: token ? `Bearer ${token}` : undefined,
//       Referer: 'localhost',
//       ...headers,
//   },
//   ...
// };

// fetch('https://api.example.com/data', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer token'
//   },
//   body: JSON.stringify({ name: 'John', age: 30 })
// });

// const res = await fetch(url, options);

const mainTop_section2 = async () => {
  const jsonPromise = await fetch("./JSON/hanwol_DB.json");
  const jsonData = await jsonPromise.json();

  const noticeSelect = get(
    "#main_top .section_2 .noticeBox .topBox_left .select"
  );
  noticeSelect.addEventListener("mouseleave", (e) => {
    if (!noticeSelect.children[2].classList.contains("hide"))
      noticeSelect.children[2].classList.toggle("hide"); //children[2] : options
  });
  noticeSelect.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.nodeName === "P") {
      noticeList(e.target.innerHTML);
      noticeSelect.children[0].innerHTML =
        "&nbsp&nbsp" + e.target.innerHTML + "&nbsp&nbsp&nbsp"; // children[0] : selected value
      noticeSelect.children[2].classList.toggle("hide");
    } else {
      noticeSelect.children[2].classList.toggle("hide");
    }
  });

  const noticeList = async (select) => {
    const noticeUl = get("#main_top .section_2 .noticeBox .content ul");
    const noticeLI = noticeUl.children[0].cloneNode(true);
    noticeUl.innerHTML = "";
    const notice_list = jsonData.notice_list;
    const list_data = notice_list
      .filter((data) => data.type === select)
      .slice(0, 11);

    list_data.forEach((data) => {
      const CurrentLi = noticeLI.cloneNode(true);
      const noticeImoge = CurrentLi.children[0].children[0].children[0];
      const noticeTag = CurrentLi.children[0].children[0].children[1];
      const noticeText = CurrentLi.children[0].children[0].children[2];
      const noticeDay = CurrentLi.children[1].children[0];
      if (data.notice === false) noticeImoge.remove();
      noticeTag.innerHTML = data.type;
      noticeText.innerHTML = "&nbsp;&nbsp;&nbsp;" + data.name;
      noticeDay.innerHTML = data.day;
      noticeUl.append(CurrentLi);
    });
  };

  const schedule_list = () => {
    class SchBox {
      //more info "index.html > .scheduleBox ul li :)"
      constructor(node) {
        this.node = node;
        this.month = node.querySelector(".month");
        this.day = node.querySelector(".day");
        this.date = node.querySelector(".date");
        this.text = node.querySelector(".textContent");
      }
    }
    const schedule_list = jsonData.schedule_list;
    const schBox = get("#main_top .section_2 .scheduleBox .content");
    schedule_list.forEach((schedule) => {
      const schli = new SchBox(schBox.querySelector(".copys").cloneNode(true));
      // schli.month = schedule_list.
      schli.month.innerHTML = new Date(schedule.date_start)
        .toString()
        .slice(4, 7)
        .toUpperCase();
      schli.day.innerHTML = new Date(schedule.date_start).getDate();
      schli.date.innerHTML = schedule.date_start + " - " + schedule.date_end;
      Object.entries(schedule.loc).forEach(([key, value]) => {
        if (value === false) {
          schli.node.querySelector("." + key).classList.add("hide");
        }
      });
      schli.text.innerHTML = schedule.name;
      schli.node.classList.remove("hide");
      schBox
        .querySelector(`.schedules${new Date(schedule.date_start).getMonth()}`)
        .append(schli.node);
    });
    const mons = getAll(
      "#main_top .section_2 .scheduleBox .topBox .topBox_right a"
    );
    const schs = schBox.querySelectorAll(`.schedules`);

    // mons[2].classList.add("hide");

    mons.forEach((mon) => {
      mon.addEventListener("click", (current) => {
        current.preventDefault();
        if (current.target.tagName === "SPAN") {
          for (i = 0; i < 3; i++) {
            mons[i].children[0].classList.remove("active");
            schs[i].classList.add("hide");
          }
          current.target.classList.add("active");
          const index = current.target.dataset.num;
          console.log();
          schBox.querySelector(`.schedules${index}`).classList.remove("hide");
        }
      });
    });
    class SlideBox {
      constructor(node, url, len) {
        this.node = node;
        this.url = url;
        this.max = len;
        this.current = 1;

        this.init();
      }
      init() {
        const ul = document.createElement("ul");
        this.node.append(ul);
        ul.append(
          this.li(this.crt(-1)),
          this.li(this.current),
          this.li(this.crt(1))
        );
      }
      li(index) {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.setAttribute("src", this.url + index + ".png");
        img.setAttribute("alt", "slide" + index);
        console.log(img.style.height);
        li.append(img);
        // li.style.position = "absolute";

        return li;
      }
      crt(val) {
        if (val === 1) {
          if (this.current + 1 > this.max) {
            return 1;
          } else {
            return this.current + 1;
          }
        } else {
          if (this.current - 1 < 1) {
            return this.max;
          } else {
            return this.current - 1;
          }
        }
      }
    }

    const slideNodes = getAll("#main_top .grapSlide");
    slideNodes.forEach((slideBox) => {
      test = new SlideBox(slideBox, "./images/maint_sect2_banner", 5);
    });

    const slideNext = () => {};
  };
  noticeList("일반");
  schedule_list();
};
mainTop_section1();
mainTop_section2();
