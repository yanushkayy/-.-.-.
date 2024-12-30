
function getDayOfWeek(day, month, year) {
    const date = new Date(year, month - 1, day); 
    const daysOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    return daysOfWeek[date.getDay()];
}


function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}


function calculateAge(day, month, year) {
    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
        age--; 
    }
    return age;
}


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
        if (patterns[digit]) {
            for (let i = 0; i < 5; i++) {
                result[i] += patterns[digit][i] + "  ";
            }
        }
    }

    return result.join("\n");
}

function displayDateInStars(day, month, year) {
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const dateStr = `${formattedDay} ${formattedMonth} ${year}`;

    return numberToStarPattern(dateStr);
}


document.getElementById('birthdate-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    const dayOfWeek = getDayOfWeek(day, month, year);

    const leapYear = isLeapYear(year);

    const age = calculateAge(day, month, year);

    const output = document.getElementById('output');
    output.innerHTML = `
        <div class="result">Ваш день рождения выпал на: ${dayOfWeek}</div>
        <div class="result">${year} был ${leapYear ? 'високосным' : 'не високосным'} годом.</div>
        <div class="result">Ваш возраст: ${age} лет.</div>
        <div class="result">Ваша дата рождения в формате звёздочек:</div>
        <pre class="star-display">${displayDateInStars(day, month, year)}</pre>
`;
});