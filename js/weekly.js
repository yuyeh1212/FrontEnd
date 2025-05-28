// 週次作業特定功能
document.addEventListener("DOMContentLoaded", function () {
  // 週次卡片的功能
  const weekCards = document.querySelectorAll(".weekCard");

  // 初始化動畫
  setTimeout(() => {
    window.animateCards(".weekCard");
  }, 100);

  // 點擊卡片事件處理
  weekCards.forEach((card) => {
    card.addEventListener("click", function () {
      const folder = this.getAttribute("data-folder");
      // 避免點擊未完成的頁面
      if (folder !== "#") {
        // 在新分頁開啟對應的index.html
        window.open(`${folder}/index.html`, "_blank");
      } else {
        // 對於未完成的頁面，添加一個簡單的提示效果
        card.classList.add("shake");
        setTimeout(() => {
          card.classList.remove("shake");
        }, 500);
      }
    });

    // 懸停效果：移動卡片圖標
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector(".cardIcon i");
      icon.style.transition = "transform 0.5s ease";

      // 隨機選擇動畫效果
      const effectNum = Math.floor(Math.random() * 4);
      switch (effectNum) {
        case 0:
          icon.style.transform = "translateY(-5px)";
          break;
        case 1:
          icon.style.transform = "rotate(15deg)";
          break;
        case 2:
          icon.style.transform = "scale(1.2)";
          break;
        case 3:
          icon.style.transform = "translateX(5px)";
          break;
      }
    });

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".cardIcon i");
      icon.style.transform = "none";
    });
  });

  // 在滾動時添加視差效果
  window.addEventListener("scroll", function () {
    // 只在週次區塊可見時執行
    if (document.getElementById("weeklySection").classList.contains("active")) {
      const scrollPosition = window.scrollY;

      weekCards.forEach((card, index) => {
        // 根據滾動位置微調卡片的位置，創造輕微的視差效果
        const offset = (scrollPosition * 0.03 * ((index % 3) + 1)) / 10;
        card.style.transform = `translateY(${-offset}px)`;
      });
    }
  });

  // 當視窗大小改變時重新計算布局
  window.addEventListener("resize", function () {
    // 只在週次區塊可見時執行
    if (document.getElementById("weeklySection").classList.contains("active")) {
      // 重新排列卡片布局
      const container = document.querySelector(".weeksContainer");
      const containerWidth = container.offsetWidth;

      // 依據容器寬度調整卡片排列
      if (containerWidth < 600) {
        // 小螢幕上的調整
        weekCards.forEach((card) => {
          card.style.height = "160px";
        });
      } else {
        // 大螢幕上的調整
        weekCards.forEach((card) => {
          card.style.height = "180px";
        });
      }
    }
  });

  // 標記已完成的週次作業 (示例數據)
  const completedWeeks = ["htmlHw", "cssHw", "flexHw", "blogCard"]; // 已完成的資料夾名稱

  weekCards.forEach((card) => {
    const folder = card.getAttribute("data-folder");
    if (completedWeeks.includes(folder)) {
      card.classList.add("completed");
    }
  });
});
