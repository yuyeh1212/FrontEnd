// 共用函數和事件
document.addEventListener("DOMContentLoaded", function () {
  // 切換週次作業和每日挑戰的功能
  const weeklyBtn = document.getElementById("weeklyBtn");
  const dailyBtn = document.getElementById("dailyBtn");
  const weeklySection = document.getElementById("weeklySection");
  const dailySection = document.getElementById("dailySection");
  const weeklyCss = document.getElementById("weeklyCss");
  const dailyCss = document.getElementById("dailyCss");

  // 切換到週次作業
  weeklyBtn.addEventListener("click", function () {
    // 更新按鈕狀態
    weeklyBtn.classList.add("active");
    dailyBtn.classList.remove("active");

    // 更新區段顯示
    weeklySection.classList.add("active");
    dailySection.classList.remove("active");

    // 啟用/禁用相應CSS
    weeklyCss.disabled = false;
    dailyCss.disabled = true;

    // 觸發重新動畫
    animateCards(".weekCard");
  });

  // 切換到每日挑戰
  dailyBtn.addEventListener("click", function () {
    // 更新按鈕狀態
    dailyBtn.classList.add("active");
    weeklyBtn.classList.remove("active");

    // 更新區段顯示
    dailySection.classList.add("active");
    weeklySection.classList.remove("active");

    // 啟用/禁用相應CSS
    dailyCss.disabled = false;
    weeklyCss.disabled = true;

    // 觸發重新動畫
    animateCards(".dayCard");

    // 更新進度條
    updateProgressBar();
  });

  // 卡片動畫效果函數
  function animateCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, index) => {
      // 先重置動畫
      card.classList.remove("fadeIn");

      // 強制重繪
      void card.offsetWidth;

      // 設置延遲添加動畫類
      setTimeout(() => {
        card.classList.add("fadeIn");
      }, 50 * index);
    });
  }

  // 更新進度條函數
  function updateProgressBar() {
    const completedCards =
      document.querySelectorAll(".dayCard.completed").length;
    const totalCards = document.querySelectorAll(".dayCard").length;
    const progressFill = document.querySelector(".progressFill");
    const completionRate = document.getElementById("completionRate");

    if (progressFill && completionRate) {
      const percentage = (completedCards / totalCards) * 100;
      progressFill.style.width = `${percentage}%`;
      completionRate.textContent = completedCards;
    }
  }

  // 全域導出共用函數
  window.animateCards = animateCards;
  window.updateProgressBar = updateProgressBar;
});
