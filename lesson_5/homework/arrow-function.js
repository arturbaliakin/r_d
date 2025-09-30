const arrSumArrow = (arr) => arr.reduce((a, b) => a + b);

const numArr = new Array();

for (let i = 1; i <= 55; i++) {
    numArr.push(i);
}

const srtingArr = ['camera', 'vtx', 'stack', 'motors', 'frame', 'props'];

console.log(arrSumArrow(numArr));
console.log(arrSumArrow(srtingArr));
