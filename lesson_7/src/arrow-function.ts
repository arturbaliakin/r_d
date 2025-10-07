const arrSumArrow = (arr: unknown[]): number | string => {
    if (arr.length === 0) return 0;
    if (typeof arr[0] === 'number') {
        return (arr as number[]).reduce((a, b) => a + (b as number), 0);
    }
    if (typeof arr[0] === 'string') {
        return (arr as string[]).reduce((a, b) => a + (b as string), '');
    }
    return 0;
};

const numArr: number[] = [];

for (let i = 1; i <= 55; i++) {
    numArr.push(i);
};

const srtingArr = ['camera', 'vtx', 'stack', 'motors', 'frame', 'props'];

console.log(arrSumArrow(numArr));
console.log(arrSumArrow(srtingArr));
