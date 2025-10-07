console.log ('-----0 > 9----');
console.log ('-----for-----');
for (let i = 0; i < 10; i++) {
    console.log (i);
}

console.log ('-----do-while----');

let itter = -1;
do {
    itter ++;
    console.log (itter);
}
while (itter < 9);

console.log ('-----map array----');

const arr = new Array();
for (let i = 0; i < 10; i++) {
    arr.push(i);
}

arr.map((i) => {
    console.log(i);
});

console.log ('-----map array----');
console.log();
console.log ('-----100 > 0----');

console.log ('-----for-----');
for (let i = 100; i >= 0; i -= 10) {
    console.log (i);
}

console.log ('-----do-while----');

let itter2 = 110;
do {
    itter2 -= 10;
    console.log (itter2);
}
while (itter2 >= 10);

console.log ('-----map array----');

const arr2 = new Array();
for (let i = 100; i >= 0; i -= 10) {
    arr2.push(i);
}

arr2.map((i) => {
    console.log(i);
});
