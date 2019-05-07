//Bài 1:

function bai1(array) {
  let sortArray = array.sort(function(x, y) {
    return y - x;
  });
  let soLonThu2 = sortArray[1];
  console.log("Số lớn thứ 2 là: " + soLonThu2);
  return soLonThu2;
}
console.log(bai1([86, 888, 666, 886, 68]));

//Bài 2:
function bai2(arr) {
  let ketqua = arr[0];
  for (str of arr) {
    if (ketqua.length < str.length) ketqua = str;
  }
  return ketqua;
}
console.log(bai2(["1", "11", "112", "1122", "11223"]));

//Bài 3:
function bai3(str, target) {
  return str.endsWith(target);
}
console.log(bai3("Uahduy", "duy"));
console.log(bai3("Uahduy", "uah"));

//Bài 4:
function bai4(arr) {
  for (let a = 0; a < arr.length; a++) {
    for (let b = a + 1; b < arr.length; b++) {
      if (arr[a] === arr[b]) return false;
    }
  }
  return true;
}
console.log(bai4(["fuck", "huhuhu", "hihiihii", 2, 6, "you", "you", "fuck"]));
console.log(bai4([0, "huhuhu", "hihiihii", 1, 2, "fuck"]));

//Bài 5:
function bai5(tagName) {
  let nodeList = document.getElementsByTagName(tagName);
  return nodeList.length;
}
console.log(bai5("p"));
