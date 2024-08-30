const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

const preventDefaultAnchor = () => {
  const $links = getAll('a[href="#"]');
  $links.forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault());
  });
};

// 공통으로 들어가는 내용을 성격별로 함수로 만들기
const navi = () => {
  const $body = get("body");
  const $header = get("#header");
  const $hdrBtmBox = get("#header .hdr-btm-box");
  const $hdrBtmGubLi = getAll("#header .hdr-btm-box .btm-box-in .gnb-ul > li");
  const $hdrBtmSubwrap = getAll("#header .hdr-btm-box .btm-box-in .sub-wrap");
  const $hdrBtmBg = get("#header .hdr-btm-box .btm-box-bg");
  const $hdrBtmSubtitleLis = getAll(
    "#header .hdr-btm-box .btm-box-in .sub-wrap .sub-title-ul ul li"
  );
  const $lagBtn = get("#header .hdr-top-box .top-box-in .hdr-r-box .lag");
  const $LagPopup = get("#header .hdr-top-box .top-box-in .lag-popup");
  const $LagPopupBtn = get("#header .hdr-top-box .top-box-in .lag-popup .btn");

  const $seh = get("#header .hdr-btm-box .btm-box-in .menu-ul .seh");
  const $sehBtn = get(
    "#header .hdr-btm-box .btm-box-in .menu-ul .seh .xi-search"
  );
  const $sehCloseBtn = get(
    "#header .hdr-btm-box .btm-box-in .menu-ul .seh .seh-wrap .closeBtn"
  );
  const $hdrPopBtn = get("#header .hdr-btm-box .pop-menu-btn");
  const $hdrPopWrap = get("#header .pop-menu-wrap");
  const $hdrPopCloseBtn1 = get(
    "#header .hdr-btm-box .bars-pop-menu .pop-menu-inner .top-bar .xi-close"
  );
  const $hdrPopCloseBtn2 = get("#header .hdr-btm-box .pop-menu-close-btn");

  let current = 0,
    old = 0;

  $hdrBtmGubLi.forEach((lis, idx) => {
    lis.addEventListener("mouseenter", (e) => {
      $header.classList.add("active");
      current = idx;
      if (current !== old) {
        $hdrBtmGubLi[current].classList.add("active");
        $hdrBtmGubLi[old].classList.remove("active");
        $hdrBtmBg.style.height = `${
          $hdrBtmSubwrap[current].offsetHeight + 50
        }px`;
        old = current;
      } else {
        $hdrBtmGubLi[current].classList.add("active");
        $hdrBtmBg.style.height = `${
          $hdrBtmSubwrap[current].offsetHeight + 50
        }px`;
      }
    });
  });
  $hdrBtmBox.addEventListener("mouseleave", (e) => {
    $hdrBtmGubLi.forEach((lis) => {
      lis.classList.remove("active");
    });
    $hdrBtmBg.style.height = `0px`;
    $header.classList.remove("active");
  });
  $hdrBtmSubtitleLis.forEach((lis, idx) => {
    lis.addEventListener("mouseenter", (e) => {
      $hdrBtmSubtitleLis.forEach((lis) => {
        lis.classList.remove("active");
      });
      e.target.classList.add("active");
    });
    lis.addEventListener("mouseleave", (e) => {
      $hdrBtmSubtitleLis.forEach((lis) => {
        lis.classList.remove("active");
      });
    });
  });
  $lagBtn.addEventListener("click", (e) => {
    $LagPopup.classList.add("active");
  });
  $LagPopupBtn.addEventListener("click", (e) => {
    $LagPopup.classList.remove("active");
  });
  $sehBtn.addEventListener("click", (e) => {
    $seh.classList.add("active");
  });
  $sehCloseBtn.addEventListener("click", (e) => {
    $seh.classList.remove("active");
  });

  $hdrPopBtn.addEventListener("click", (e) => {
    $hdrPopWrap.classList.add("active");
    $body.classList.add("oh");
  });
  $hdrPopCloseBtn1.addEventListener("click", (e) => {
    $hdrPopWrap.classList.remove("active");
    $body.classList.remove("oh");
  });
  $hdrPopCloseBtn2.addEventListener("click", (e) => {
    $hdrPopWrap.classList.remove("active");
    $body.classList.remove("oh");
  });
};
const familySite = () => {
  let $lis = getAll("#footer .footer-top-box .top-box-inner > ul > li");
  let $subWrap = getAll(
    "#footer .footer-top-box .top-box-inner > ul > li > .sub-wrap"
  );
  let $footerTopBoxAbtn = getAll(
    "#footer .footer-top-box .top-box-inner > ul > li > a"
  );
  let $footerTopBoxUl = get("#footer .footer-top-box .top-box-inner > ul");
  let current = 0,
    old = 0;
  $footerTopBoxAbtn.forEach((aBtn, idx) => {
    aBtn.addEventListener("click", (e) => {
      current = idx;
      e.preventDefault();
      if (current !== old) {
        $lis[current].classList.add("active");
        $lis[old].classList.remove("active");
        $footerTopBoxUl.style.height = `${
          $subWrap[current].offsetHeight + 55
        }px`;
        old = current;
      } else {
        $lis[current].classList.toggle("active");
        $footerTopBoxUl.style.height = `${
          $subWrap[current].offsetHeight + 55
        }px`;
      }
    });
  });
};

const comInit = () => {
  const getPage = (page, tag) => {
    fetch(page)
      .then((res) => res.text())
      .then((res) => {
        if (tag === "#header") {
          get(tag).innerHTML = res;

          navi();
        }
        if (tag === "#footer") {
          get(tag).innerHTML = res;
          familySite();
        }
      });
  };
  getPage("page/headerMainTop.html", "#header");
  getPage("page/footerMainTop.html", "#footer");
};

(() => {
  preventDefaultAnchor();
  comInit();
})();
