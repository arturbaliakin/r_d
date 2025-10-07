export {};

function arrSum(arr: unknown[]): Record<string, unknown> {
    const initialValue = typeof arr[0] === 'string' ? '' : 0;
    return {
        sum: arr.reduce((a, b) => {
            if (typeof initialValue === 'string') {
                return String(a) + String(b);
            } else {
                return Number(a) + Number(b);
            }
        }, initialValue)
    };
}

const numArr: number[] = [];

for (let i = 1; i <= 55; i++) {
    numArr.push(i);
};

const srtingArr = ['camera', 'vtx', 'stack', 'motors', 'frame', 'props'];

console.log(arrSum(numArr));

console.log(arrSum(srtingArr));
