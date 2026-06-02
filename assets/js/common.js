jQuery(function ($) {

// ハンバーガーメニュー
// ________________________________________________________
const header = document.querySelector('.js-header');
const headerBtn = document.querySelector('.js-header-btn');
const subNav = document.querySelector('.p-sub-nav'); // ハンバーガーメニュー内ナビを選択

headerBtn.addEventListener('click', () => {
  const isOpen = header.classList.toggle('active'); // activeクラスの追加/削除をトグルし、状態を取得
  headerBtn.setAttribute('aria-expanded', isOpen); // aria-expanded属性を更新
  subNav.setAttribute('aria-hidden', !isOpen); // aria-hidden属性を更新
});


// ヘッダーサブナビクラス名追加
$('.js-header-btn').on('click', function () {
  $('.p-sub-nav').toggleClass('visible');
}); 

// ページ内リンク飛ぶ用の追記
$('.js-header-nav a[href]').on('click', function(event) {
  $('.js-header-btn').trigger('click');
});



// ナビのカレント表示
// ________________________________________________________
$(function () {
  $('.js-tab01').each(function () {
    if (this.href == location.href) {
      $(this).parents('li').addClass('current');
    }
  });
});



// page-topスムーススクロール
// ________________________________________________________
$(function() {
  $('.js-page-top').hide();
  $(window).scroll(function() {
    if($(this).scrollTop() > 250) {
        $('.js-page-top').fadeIn(250);
      } else {
        $('.js-page-top').fadeOut(250);
        }
    });
    $('.js-page-top').click(function(){
    $('html, body').animate({scrollTop: 0}, 250);
  });
});


// アコーディオン
// ________________________________________________________
$(function() {
  $(".js-accordion-btn").on("click", function() {
    const content = $(this).parent(".c-accordion__title").next(".c-accordion__body"); // アコーディオンの内容部分
    const isExpanded = $(this).attr("aria-expanded") === "true"; // 現在の状態を取得
    
    // aria-expandedを切り替える
    $(this).attr("aria-expanded", !isExpanded);
    
    // aria-hiddenを切り替える
    content.attr("aria-hidden", isExpanded);
    
    $(this).toggleClass("is-open"); // クラスを切り替える
    content.slideToggle(300);
  });
});


// header高さ引いてスムーススクロール
// ________________________________________________________
// 固定ヘッダー分リンク飛ばした時調整
  if(window.matchMedia("(max-width: 767px)").matches){
    $(function () {
      var headerHight = 75;
      $('a[href^="#"]:not(.js-tab-link)').click(function () {
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var position = target.offset().top - headerHight;
      $("html, body").animate({ scrollTop: position }, 200, "linear");
      return false;
      });
      });
  }else{ 
    $(function () {
      var headerHight = 120;
      $('a[href^="#"]:not(.js-tab-link)').click(function () {
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var position = target.offset().top - headerHight;
      $("html, body").animate({ scrollTop: position }, 250, "linear");
      return false;
      });
      });
  }

  
});

// コピーライト年数動的
document.getElementById("current-year").innerText = new Date().getFullYear();



// 340px以下スケーリング
// ________________________________________________________
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value = window.outerWidth > 340 ? 'width=device-width,initial-scale=1' : 'width=390';
    if (viewport && viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  window.addEventListener('resize', switchViewport);
  switchViewport();
})();






// タブ切り替え
// ________________________________________________________
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".js-tab");
  if (!root) return;

  const tabItems = Array.from(root.querySelectorAll(".p-tab__item"));
  const tabLinks = Array.from(root.querySelectorAll(".js-tab-link"));
  const panels = Array.from(root.querySelectorAll(".p-tab__panel"));
  if (tabLinks.length === 0 || panels.length === 0) return;

  const getPanelByHash = (hash) => {
    if (!hash) return null;
    try {
      return root.querySelector(hash);
    } catch {
      return null;
    }
  };

  const setActive = (hash) => {
    const target = getPanelByHash(hash);
    const panel = target || root.querySelector(".p-tab__panel--first") || panels[0];
    if (!panel) return;

    const id = `#${panel.id}`;
    const activeLink = tabLinks.find((a) => a.getAttribute("href") === id);
    const activeItem = activeLink?.closest(".p-tab__item");

    tabItems.forEach((li) => li.classList.remove("is-active"));
    tabLinks.forEach((a) => {
      a.setAttribute("aria-selected", "false");
      a.setAttribute("tabindex", "-1");
    });

    if (activeItem) activeItem.classList.add("is-active");
    if (activeLink) {
      activeLink.setAttribute("aria-selected", "true");
      activeLink.setAttribute("tabindex", "0");
    }

    panels.forEach((p) => {
      p.classList.remove("is-active");
      p.setAttribute("aria-hidden", "true");
    });
    panel.classList.add("is-active");
    panel.setAttribute("aria-hidden", "false");
  };

  root.addEventListener(
    "click",
    (e) => {
      const link = e.target.closest(".js-tab-link");
      if (!link || !root.contains(link)) return;

      e.preventDefault(); // ← #を付けない
      setActive(link.getAttribute("href"));
    },
    true
  );

  // ここ（最後）：最初は必ず01を開く（#は使わない）
  setActive(null);
});







// スクロールヒント
// ________________________________________________________
document.addEventListener("DOMContentLoaded", function () {
  const element1 = document.querySelector(".js-scroll-1");
  const element2 = document.querySelector(".js-scroll-2");

  // .js-scroll-1 が存在する場合のみ ScrollHint を初期化
  if (element1) {
    const scrollHint1 = new ScrollHint(".js-scroll-1", {
      i18n: {
        scrollable: "スクロールできます",
      },
      remainingTime: 5000,
      suggestiveShadow: true,
      // scrollHintIconAppendClass: "scroll-hint-icon-white",
    });
  }

  // .js-scroll-2 が存在する場合のみ ScrollHint を初期化
  if (element2) {
    const scrollHint2 = new ScrollHint(".js-scroll-2", {
      i18n: {
        scrollable: "スクロールできます2",
      },
      remainingTime: 1000,
      suggestiveShadow: true,
    });
  }
});