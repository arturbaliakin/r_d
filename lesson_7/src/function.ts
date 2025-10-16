export {};

function arrSum(arr: number[] | string[]): number | string {
    const initialValue = typeof arr[0] === 'string' ? '' : 0;
    return arr.reduce((a, b) => {
        if (typeof initialValue === 'string') {
            return String(a) + String(b);
        } else {
            return Number(a) + Number(b);
        }
    }, initialValue);

}

const numArr: number[] = [];

for (let i = 1; i <= 55; i++) {
    numArr.push(i);
};

const srtingArr = ['camera', 'vtx', 'stack', 'motors', 'frame', 'props'];

console.log(arrSum(numArr));

console.log(arrSum(srtingArr));
