const a = 3;
const b = '3';
const c = a;
const d = b;
const t = true;
const f = false;

if (a > b) {
    console.log('Case 1 triggered');
} else if (a == b) {
    console.log('Case 2 triggered');
} else if (a === d) {
    console.log('Case 3 triggered');
} else {
    console.log('Case 4 triggered');
}

if (t && f) {
    console.log('Case 1 triggered');
} else if (t || f) {
    console.log('Case 2 triggered');
} else {
    console.log('Case 3 triggered');
}

if ((a > c) && b < d) {
    console.log('Case 1 triggered');
} else if ((a < 2) || f) {
    console.log('Case 2 triggered');
} else {
    console.log('Case 3 triggered');
}

if ((a === b) || (t && !f)) {
    console.log('Case 1 triggered');
} else {
    console.log('Case 2 triggered');
}
