//新增從輸入框抓值並放入陣列
let data = []; //新增空陣列裝代辦事項
let filterStatus = "all"; // "all" 全部, "completed" 未完成, "pending"已完成 更新三個分頁切換狀態
const card_input = document.querySelector(".card>input");
const btn_add = document.querySelector(".btn_add");

//切換3分頁<li>按鈕的class效果--------------------------------------------------------
const tab = document.querySelector(".tab");
tab.addEventListener("click", function (e) {
  if (e.target.nodeName === "UL") {
    //console.log("你點到ul了");
    return;
  }

  const btnGroup = document.querySelectorAll(".tab li");
  //抓取2個切換分頁的<li>按鈕   1.全部 2.待完成 3.已完成

  btnGroup.forEach((btn) => {
    btn.classList.remove("active");
    //先讓3個按鈕統一移除active這個class
  });
  e.target.classList.add("active");
  //給點擊的那一個分頁按鈕再添加 一個class="active"
});
// 切換三個按鈕狀態
const filter_all = document.querySelector(".filter-all"); //完成
const filter_completed = document.querySelector(".filter-completed"); //未完成
const filter_pending = document.querySelector(".filter-pending"); //已完成
filter_all.addEventListener("click", function () {
  filterStatus = "all";
});
filter_completed.addEventListener("click", function () {
  filterStatus = "completed";
});
filter_pending.addEventListener("click", function () {
  filterStatus = "pending";
});

btn_add.addEventListener("click", function () {
  if (card_input.value.trim() === "") {
    alert("請輸入正確文字");
    return;
  }
  let val = card_input.value;
  card_input.value = "";
  data.push({ content: val, completed: false });
  //用completed: false來管理是否打勾完成的狀態
  render();
});

//渲染畫面
const list = document.querySelector(".list"); //插入代辦事項<li>
function render() {
  // 先根據篩選狀態過濾待辦事項
  let filteredData = []; //創一個空陣列存放篩選後的資料
  let str = "";

  if (filterStatus === "all") {
    filteredData = data;
  } else if (filterStatus === "completed") {
    filteredData = data.filter((item) => item.completed === false);
  } else if (filterStatus === "pending") {
    filteredData = data.filter((item) => item.completed === true);
  }

  filteredData.forEach((item) => {
    str += `<li>
    <label class="checkbox" for="">
      <input type="checkbox" />
      <span>${item.content}</span>
    </label>
    <a href="#" class="delete"></a>
  </li>`;
  });
  list.innerHTML = str;
}
