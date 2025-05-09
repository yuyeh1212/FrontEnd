// 每日挑戰特定功能
document.addEventListener("DOMContentLoaded", function () {
  // 每日挑戰數據 (實際使用時可從伺服器獲取)
  const dailyChallenges = [
    {
      day: 1,
      title: "HTML 標籤元素",
      category: "CSS",
      icon: "fa-html5",
      completed: true,
    },
    {
      day: 2,
      title: "CSS選擇器",
      category: "CSS",
      icon: "fa-css3-alt",
      completed: true,
    },
    {
      day: 3,
      title: "Flexbox布局",
      category: "CSS",
      icon: "fa-css3",
      completed: true,
    },
    {
      day: 4,
      title: "表單元素",
      category: "HTML",
      icon: "fa-wpforms",
      completed: true,
    },
    {
      day: 5,
      title: "響應式設計",
      category: "CSS",
      icon: "fa-mobile-alt",
      completed: false,
    },
    {
      day: 6,
      title: "JavaScript基礎",
      category: "JS",
      icon: "fa-js",
      completed: false,
    },
    {
      day: 7,
      title: "DOM操作",
      category: "JS",
      icon: "fa-sitemap",
      completed: false,
    },
    {
      day: 8,
      title: "事件處理",
      category: "JS",
      icon: "fa-bolt",
      completed: false,
    },
    {
      day: 9,
      title: "LocalStorage",
      category: "JS",
      icon: "fa-database",
      completed: false,
    },
    {
      day: 10,
      title: "API請求",
      category: "JS",
      icon: "fa-cloud-download-alt",
      completed: false,
    },
    {
      day: 11,
      title: "CSS動畫",
      category: "CSS",
      icon: "fa-magic",
      completed: false,
    },
    {
      day: 12,
      title: "CSS Grid",
      category: "CSS",
      icon: "fa-th",
      completed: false,
    },
    {
      day: 13,
      title: "SVG繪圖",
      category: "HTML",
      icon: "fa-bezier-curve",
      completed: false,
    },
    {
      day: 14,
      title: "偽元素使用",
      category: "CSS",
      icon: "fa-cut",
      completed: false,
    },
    {
      day: 15,
      title: "模組化JS",
      category: "JS",
      icon: "fa-cubes",
      completed: false,
    },
    {
      day: 16,
      title: "Promise異步",
      category: "JS",
      icon: "fa-tasks",
      completed: false,
    },
    {
      day: 17,
      title: "多媒體元素",
      category: "HTML",
      icon: "fa-film",
      completed: false,
    },
    {
      day: 18,
      title: "CSS變數",
      category: "CSS",
      icon: "fa-palette",
      completed: false,
    },
    {
      day: 19,
      title: "面向對象JS",
      category: "JS",
      icon: "fa-object-group",
      completed: false,
    },
    {
      day: 20,
      title: "表單驗證",
      category: "JS",
      icon: "fa-check-circle",
      completed: false,
    },
    {
      day: 21,
      title: "綜合專案",
      category: "ALL",
      icon: "fa-project-diagram",
      completed: false,
    },
  ];

  // 獲取挑戰卡片容器
  const daysContainer = document.querySelector(".days-container");

  // 判斷當前日期，模擬進度 (實際應用中可能需要從服務器獲取真實進度)
  const today = new Date();
  const currentDay = 5; // 假設現在是第5天，實際使用可計算真實天數

  // 更新進度條函數
  function updateProgressBar() {
    const completedChallenges = dailyChallenges.filter(
      (c) => c.completed
    ).length;
    const totalChallenges = dailyChallenges.length;
    const progressFill = document.querySelector(".progress-fill");
    const completionRate = document.getElementById("completion-rate");

    // 更新進度條寬度
    const progressPercentage = (completedChallenges / totalChallenges) * 100;
    progressFill.style.width = progressPercentage + "%";

    // 更新完成數量
    completionRate.textContent = completedChallenges;
  }

  // 創建每日挑戰卡片
  function createDailyCards() {
    // 清空容器
    daysContainer.innerHTML = "";

    // 創建21天挑戰卡片
    dailyChallenges.forEach((challenge) => {
      // 創建卡片元素
      const card = document.createElement("div");
      card.className = "card day-card";
      card.setAttribute("data-day", challenge.day);

      // 添加狀態類別
      if (challenge.completed) {
        card.classList.add("completed");
      } else if (challenge.day === currentDay) {
        card.classList.add("today");
      } else if (challenge.day > currentDay) {
        card.classList.add("locked");
      }

      // 設置卡片內容
      card.innerHTML = `
          <div class="card-content">
            <h3><span class="day-number">${challenge.day}</span>${challenge.title}</h3>
            <p>分類: ${challenge.category}</p>
            <div class="card-icon">
              <i class="fab ${challenge.icon}"></i>
            </div>
          </div>
        `;

      // 添加點擊事件
      card.addEventListener("click", function () {
        // 如果是未解鎖的挑戰，顯示提示
        if (card.classList.contains("locked")) {
          alert("此挑戰尚未解鎖！請完成當前挑戰。");
          return;
        }

        // 已完成或當前挑戰，開啟對應頁面
        const day = this.getAttribute("data-day");

        // 檢查對應頁面是否存在
        const challengePage = `daily/day${day}/index.html`;

        // 使用fetch檢查頁面是否存在
        fetch(challengePage, { method: "HEAD" })
          .then((response) => {
            if (response.ok) {
              // 頁面存在，跳轉到對應頁面
              window.open(challengePage, "_blank");
            } else {
              // 頁面不存在，顯示提示
              alert(`第${day}天挑戰頁面開發中！`);
            }
          })
          .catch((error) => {
            // 出錯時顯示提示
            alert(`第${day}天挑戰頁面開發中！`);
            console.error("頁面檢查錯誤:", error);
          });
      });

      // 將卡片添加到容器
      daysContainer.appendChild(card);
    });

    // 更新進度條
    updateProgressBar();
  }

  // 添加卡片懸停效果
  function addCardHoverEffects() {
    const dayCards = document.querySelectorAll(".day-card:not(.locked)");

    dayCards.forEach((card) => {
      // 懸停時圖標效果
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".card-icon i");
        if (icon) {
          icon.style.transition = "transform 0.4s ease";

          // 根據卡片狀態選擇效果
          if (card.classList.contains("completed")) {
            icon.style.transform = "rotate(360deg)";
          } else if (card.classList.contains("today")) {
            icon.style.transform = "scale(1.3)";
          } else {
            icon.style.transform = "translateY(-5px)";
          }
        }
      });

      card.addEventListener("mouseleave", function () {
        const icon = this.querySelector(".card-icon i");
        if (icon) {
          icon.style.transform = "none";
        }
      });
    });
  }

  // 實現卡片過濾功能
  function setupFiltering() {
    // 創建過濾控件 (可選)
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";
    filterContainer.innerHTML = `
        <div class="filter-title">過濾挑戰：</div>
        <button class="filter-btn active" data-filter="all">全部</button>
        <button class="filter-btn" data-filter="HTML">HTML</button>
        <button class="filter-btn" data-filter="CSS">CSS</button>
        <button class="filter-btn" data-filter="JS">JavaScript</button>
      `;

    // 插入到標題後面
    const sectionTitle = document.querySelector(
      "#daily-section .section-title"
    );
    sectionTitle.after(filterContainer);

    // 添加過濾功能
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        // 更新按鈕狀態
        filterButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        // 獲取過濾條件
        const filter = this.getAttribute("data-filter");

        // 過濾卡片
        const dayCards = document.querySelectorAll(".day-card");
        dayCards.forEach((card) => {
          const category = card.querySelector("p").textContent.split(": ")[1];

          if (
            filter === "all" ||
            category === filter ||
            (category === "ALL" && filter !== "all")
          ) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 初始化函數
  function initDailyChallenge() {
    createDailyCards();
    addCardHoverEffects();
    setupFiltering();

    // 初始動畫
    setTimeout(() => {
      window.animateCards(".day-card");
    }, 100);
  }

  // 檢查是否在挑戰區塊顯示時初始化
  // 如果直接顯示每日挑戰，就立即初始化
  if (document.getElementById("daily-btn").classList.contains("active")) {
    initDailyChallenge();
  }

  // 添加點擊事件監聽，當切換到每日挑戰時初始化
  document.getElementById("daily-btn").addEventListener("click", function () {
    // 檢查是否已經初始化過
    if (daysContainer.children.length === 0) {
      initDailyChallenge();
    }
  });

  // 窗口大小變化時重新排列
  window.addEventListener("resize", function () {
    // 只在每日挑戰區塊可見時執行
    if (document.getElementById("daily-section").classList.contains("active")) {
      // 響應式調整...
      const containerWidth = daysContainer.offsetWidth;

      // 小螢幕調整
      if (containerWidth < 480) {
        document.querySelectorAll(".day-card").forEach((card) => {
          card.style.height = "130px";
        });
      } else {
        document.querySelectorAll(".day-card").forEach((card) => {
          card.style.height = "160px";
        });
      }
    }
  });
});
