const numbers = [1, 2, 3, 4, 5];
const strings = ['apple', 'banana', 'avocado'];
const booleans = [true, false];
const any = [42, 'srt', false, null, { key: 'value' }];

const contain2 = numbers.find(n => n === 2);
const arrsort = strings.sort();
const conc = booleans.concat(any);

console.log(contain2);
console.log(arrsort);
console.log(conc);
console.log();

any.forEach((item) => {
    console.log(item);
});

conc.map ((item, index) => {
    console.log(index + '->' + item);
});
