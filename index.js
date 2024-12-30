// Функция для получения дня недели
function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day); // Месяцы в JavaScript начинаются с 0
    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    return daysOfWeek[date.getDay()];
}

// Функция для проверки високосного года
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Функция для вычисления возраста
function calculateAge(day, month, year) {
    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
        age--; // Если день рождения еще не был в текущем году
    }
    return age;
}

// Функция для преобразования числа в "электронное табло"
function numberToStarPattern(number) {
    const patterns = {
        '0': [" *** ", "*   *", "*   *", "*   *", " *** "],
        '1': ["  *  ", " **  ", "  *  ", "  *  ", " *****"],
        '2': [" *** ", "*   *", "  *  ", " *   ", "*****"],
        '3': [" *** ", "*   *", "  ** ", "*   *", " *** "],
        '4': ["*   *", "*   *", " *****", "    *", "    *"],
        '5': ["*****", "*    ", "**** ", "    *", "**** "],
        '6': [" *** ", "*    ", "**** ", "*   *", " *** "],
        '7': ["*****", "    *", "   * ", "  *  ", " *   "],
        '8': [" *** ", "*   *", " *** ", "*   *", " *** "],
        '9': [" *** ", "*   *", "**** ", "    *", " *** "]
    };

    const numStr = number.toString();
    let result = ["", "", "", "", ""];

    for (let digit of numStr) {
        // Проверка, чтобы только цифры использовались
        if (patterns[digit]) {
            for (let i = 0; i < 5; i++) {
                result[i] += patterns[digit][i] + "  ";
            }
        }
    }

    return result.join("\n");
}

// Функция для отображения даты с цифрами в виде звёздочек
function displayDateInStars(day, month, year) {
    const dateStr = `${day < 10 ? '0' + day : day} ${month < 10 ? '0' + month : month} ${year}`;
    return numberToStarPattern(dateStr);
}

// Функция для обработки отправки формы
document.getElementById('birthdate-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // Получаем данные с формы
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    // Вычисляем день недели
    const dayOfWeek = getDayOfWeek(day, month, year);

    // Проверяем високосность года
    const leapYear = isLeapYear(year);

    // Вычисляем возраст
    const age = calculateAge(day, month, year);

    // Отображаем результаты
    const output = document.getElementById('output');
    output.innerHTML = `
        <div class="result">Ваш день рождения выпал на: ${dayOfWeek}</div>
        <div class="result">${year} был ${leapYear ? 'високосным' : 'не високосным'} годом.</div>
        <div class="result">Ваш возраст: ${age} лет.</div>
        <div class="result">Ваша дата рождения в формате звёздочек:</div>
        <pre class="star-display">${displayDateInStars(day, month, year)}</pre>
    `;
});