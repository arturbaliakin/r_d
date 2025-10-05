async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    useInfo(data);
}

function useInfo(data) {
    console.log('Отриманий JSON з відображенням перших 2-ох об\'єктів:', data.slice(0, 2));

    if (Array.isArray(data)) {
        console.log('Всього кількість елементів у файлі: ', data.length);
    } else {
        console.log('Прийшов об’єкт, а не масив');
    }
}

getData('https://jsonplaceholder.typicode.com/posts');
