// Функция для получения данных из файла .json
// Функция для получения данных из файла .json
const getData = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data);
        } else if (xhr.status !== 200) {
            callback(null, new Error('Ошибка при получении данных'));
        }
    };
    xhr.send();
};

// Функция для отправки данных на URL
const sendData = (url, data, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(null);
        } else if (xhr.status !== 200) {
            callback(new Error('Ошибка при отправке данных'));
        }
    };
    xhr.send(JSON.stringify(data));
};

// Пример использования функций
getData('data.json', (data, error) => {
    if (error) {
        console.error(error);
    } else {
        sendData('https://example.com/api', data, (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Данные успешно отправлены');
            }
        });
    }
});
