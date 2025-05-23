document.addEventListener("DOMContentLoaded", function () {
  const timeElements = document.querySelectorAll("time.blogDate");
  const searchInput = document.getElementById("searchInput");
  const blogItems = document.querySelectorAll(".blogItem");
  const blogList = document.querySelector(".blogList");

  // 分頁相關變數
  const itemsPerPage = 6;
  let currentPage = 1;
  let filteredItems = Array.from(blogItems);

  // 原有的時間格式化功能
  timeElements.forEach(function (timeElement) {
    if (timeElement.hasAttribute("datetime")) return;
    const dateText = timeElement.textContent.trim();
    const datetimeValue = dateText.replace(/\//g, "-");
    timeElement.setAttribute("datetime", datetimeValue);
  });

  // 創建分頁控制器
  function createPagination() {
    const existingPagination = document.querySelector(".paginationContainer");
    if (existingPagination) {
      existingPagination.remove();
    }

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (totalPages <= 1) return;

    const paginationContainer = document.createElement("div");
    paginationContainer.className = "paginationContainer";

    const pagination = document.createElement("ul");
    pagination.className = "pagination";

    // 上一頁按鈕
    const prevBtn = document.createElement("li");
    prevBtn.className = `pageItem ${currentPage === 1 ? "disabled" : ""}`;
    prevBtn.innerHTML = '<a href="#" class="pageLink">上一頁</a>';
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        displayPage();
        updatePagination();
        // 捲動到頁面頂部
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    pagination.appendChild(prevBtn);

    // 頁碼按鈕
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("li");
      pageBtn.className = `pageItem ${i === currentPage ? "active" : ""}`;
      pageBtn.innerHTML = `<a href="#" class="pageLink">${i}</a>`;
      pageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        currentPage = i;
        displayPage();
        updatePagination();
        // 捲動到頁面頂部
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      pagination.appendChild(pageBtn);
    }

    // 下一頁按鈕
    const nextBtn = document.createElement("li");
    nextBtn.className = `pageItem ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    nextBtn.innerHTML = '<a href="#" class="pageLink">下一頁</a>';
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        displayPage();
        updatePagination();
        // 捲動到頁面頂部
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    pagination.appendChild(nextBtn);

    paginationContainer.appendChild(pagination);
    blogList.parentNode.appendChild(paginationContainer);
  }

  // 更新分頁狀態
  function updatePagination() {
    createPagination();
  }

  // 顯示當前頁面的項目 - 修復排版問題
  function displayPage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // 隱藏所有項目，但保持原本的 display 屬性
    blogItems.forEach((item) => {
      item.style.display = "none";
    });

    // 顯示當前頁面的項目，使用空字串恢復 CSS 原本的 display 設定
    filteredItems.slice(startIndex, endIndex).forEach((item) => {
      item.style.display = "";
    });

    // 如果沒有結果，顯示提示訊息
    if (filteredItems.length === 0) {
      showNoResults();
    } else {
      hideNoResults();
    }
  }

  // 顯示無結果提示
  function showNoResults() {
    let noResultsDiv = document.querySelector(".noResults");
    if (!noResultsDiv) {
      noResultsDiv = document.createElement("div");
      noResultsDiv.className = "noResults";
      noResultsDiv.innerHTML = `
        <div class="noResultsIcon">🔍</div>
        <div>找不到相關文章，請嘗試其他關鍵字</div>
      `;
      blogList.parentNode.insertBefore(noResultsDiv, blogList.nextSibling);
    }
    noResultsDiv.style.display = "block";
  }

  // 隱藏無結果提示
  function hideNoResults() {
    const noResultsDiv = document.querySelector(".noResults");
    if (noResultsDiv) {
      noResultsDiv.style.display = "none";
    }
  }

  // 搜尋功能
  function performSearch(keyword) {
    keyword = keyword.toLowerCase().trim();

    filteredItems = Array.from(blogItems).filter(function (item) {
      const title = item.querySelector(".blogTitle").textContent.toLowerCase();
      const excerpt = item
        .querySelector(".blogExcerpt")
        .textContent.toLowerCase();
      const tags = Array.from(item.querySelectorAll(".blogTag"))
        .map((tag) => tag.textContent.toLowerCase())
        .join(" ");

      return (
        keyword === "" ||
        title.includes(keyword) ||
        excerpt.includes(keyword) ||
        tags.includes(keyword)
      );
    });

    // 重置到第一頁
    currentPage = 1;

    // 顯示搜尋結果並更新分頁
    displayPage();
    updatePagination();
  }

  // 監聽搜尋輸入框的變化
  searchInput.addEventListener("input", function () {
    const keyword = this.value;
    performSearch(keyword);
  });

  // 監聽 Enter 鍵
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const keyword = this.value;
      performSearch(keyword);
    }
  });

  // 初始化顯示第一頁
  performSearch("");
});
