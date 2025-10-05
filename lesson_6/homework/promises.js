function getInfo(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Помилка запиту: ' + response.status);
            }
            return response.json();
        });
}

function useInfo(data) {
    console.log('Отриманий JSON з відображенням перших 2-ох об\'єктів:', data);
    if (Array.isArray(data)) {
        console.log('Всього кількість елементів у файлі: ', data.length);
    } else {
        console.log('Прийшов об’єкт, а не масив');
    }
}

getInfo('https://jsonplaceholder.typicode.com/posts')
    .then(json => useInfo(json.slice(0, 2)))
    .catch(error => console.error('Сталася помилка:', error));
