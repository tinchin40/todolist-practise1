//--------------------------------------------------------------------------
// 初始化資料
let data = []; // 儲存代辦事項
let filterStatus = "all"; // 篩選狀態， "all" 全部, "completed" 完成, "pending" 待完成

const card_input = document.querySelector(".card>input");
const btn_add = document.querySelector(".btn_add");

// 切換分頁按鈕的 class
const tab = document.querySelector(".tab");
tab.addEventListener("click", function (e) {
  if (e.target.nodeName !== "LI") return; // 確保點擊的是 <li> 元素

  const btnGroup = document.querySelectorAll(".tab li");
  btnGroup.forEach((btn) => btn.classList.remove("active"));
  e.target.classList.add("active"); // 點擊後添加 active 類名
});

// 切換篩選狀態
const filter_all = document.querySelector(".filter-all");
const filter_completed = document.querySelector(".filter-completed");
const filter_pending = document.querySelector(".filter-pending");

filter_all.addEventListener("click", function () {
  filterStatus = "all";
  render();
});
filter_completed.addEventListener("click", function () {
  filterStatus = "pending";
  render();
});
filter_pending.addEventListener("click", function () {
  filterStatus = "completed";
  render();
});

// 新增代辦事項
btn_add.addEventListener("click", function () {
  const value = card_input.value.trim();
  if (value === "") {
    alert("請輸入代辦事項");
    return;
  }

  // 新增資料到陣列
  data.push({ content: value, completed: false });
  card_input.value = ""; // 清空輸入框
  render(); // 重新渲染
});

// 渲染畫面
const list = document.querySelector(".list");

function render() {
  let filteredData = [];

  // 根據篩選條件過濾代辦事項
  if (filterStatus === "all") {
    filteredData = data;
  } else if (filterStatus === "completed") {
    filteredData = data.filter((item) => item.completed === true); // 顯示已完成
  } else if (filterStatus === "pending") {
    filteredData = data.filter((item) => item.completed === false); // 顯示未完成
  }

  let str = "";

  // 渲染每一個代辦事項
  filteredData.forEach((item, index) => {
    str += `<li data-index="${index}">
      <label class="checkbox">
        <input type="checkbox" ${item.completed ? "checked" : ""} />
        <span>${item.content}</span>
      </label>
      <a href="#" class="delete">刪除</a>
    </li>`;
  });

  list.innerHTML = str; // 更新列表

  // 添加 checkbox 事件處理
  document.querySelectorAll(".checkbox input").forEach((checkbox, index) => {
    checkbox.addEventListener("change", function () {
      data[index].completed = checkbox.checked; // 更新該代辦事項的 completed 狀態
      render(); // 重新渲染
    });
  });

  // 刪除功能
  document.querySelectorAll(".delete").forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      data.splice(index, 1); // 刪除該代辦事項
      render(); // 重新渲染
    });
  });
  updatePendingCount();
}

//左下顯示未完成代辦事項數量
const list_footer_p = document.querySelector(".list_footer p");
function updatePendingCount() {
  const pendingCount = data.filter((item) => !item.completed); //計算未完成項目並放到新陣列
  list_footer_p.textContent = `${pendingCount.length}個待完成項目`; //未完成項目陣列的長度，更新上數量
}

//右下清空完成代辦事項按鈕

const deleteCompletedBtn = document.querySelector(".list_footer a");
deleteCompletedBtn.addEventListener("click", function () {
  data = data.filter((item) => !item.completed); //只保留未完成的
  //data = data.filter((item) => item.completed === false); 這等於上面意思
  render(); //重新渲染列表
  updatePendingCount(); //更新未完成數量
});
