const a = 3;
const b = '3';
const c = a;
const d = b;
const t = true;
const f = false;


console.log('a == b:', a == b);
console.log('a === b:', a === b);
console.log('a === c:', a === c);
console.log('b === d:', b === d);

console.log('t && f:', t && f);
console.log('t || f:', t || f);
console.log('!t:', !t);
console.log('!f:', !f);

console.log('(a > 2) && t:', (a > 2) && t);
console.log('(a < 2) || f:', (a < 2) || f);
console.log('(a == b) && (c === a):', (a == b) && (c === a));
console.log('(a === b) || (t && !f):', (a === b) || (t && !f));
