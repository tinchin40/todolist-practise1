//新增從輸入框抓值並放入陣列
let data = []; //新增空陣列裝代辦事項
const card_input = document.querySelector(".card>input");
const btn_add = document.querySelector(".btn_add");

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
  let str = "";
  data.forEach((item) => {
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
