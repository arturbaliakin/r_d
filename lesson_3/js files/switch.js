const a = 3;
const b = '3';
const c = a;
const d = b;
const t = true;
const f = false;

switch (true) {
    case (a > d):
        console.log('case 1 triggered');
        break;

    case (a <= b):
        console.log('case 2 triggered');
        break;

    case (a === c):
        console.log('case 3 triggered');
        break;

    default:
        console.log('case 4 triggered');
}

switch (true) {
    case (t && f):
        console.log('case 1 triggered');
        break;

    case (t || f):
        console.log('case 2 triggered');
        break;

    default:
        console.log('case 3 triggered');
}

switch (true) {
    case ((a > 2) && t):
        console.log('case 1 triggered');
        break;

    case ((a < 2) || f):
        console.log('case 2 triggered');
        break;

    default:
        console.log('case 3 triggered');
}

switch (true) {
    case ((a === b) || (t && !f)):
        console.log('case 1 triggered');
        break;

    default:
        console.log('case 2 triggered');
}
