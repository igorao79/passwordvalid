// Массив для хранения паролей
const savedPasswords = [];

const conditions = [
    { test: (password) => password.length >= 5 && password.length <= 10, element: document.getElementById('symb') },
    { test: (password) => /^[A-ZА-Я]/.test(password), element: document.getElementById('upper') },
    { test: (password) => !password.includes(' '), element: document.getElementById('space') },
    { test: (password) => !/[^A-Za-zА-Яа-я0-9]/.test(password), element: document.getElementById('spec') },
    { test: (password) => checkPassword(password), element: document.getElementById('repeat') }
];

function validatePassword(password) {
    let isValid = true;

    conditions.forEach(({ test, element }) => {
        const isConditionMet = test(password);
        element.classList.toggle('valid', isConditionMet);
        element.classList.toggle('invalid', !isConditionMet);
        if (!isConditionMet) isValid = false;
    });

    return isValid;
}

function checkPassword(password, limit = 3) {
    const counts = {};
    for (let char of password) {
        if ((counts[char] = (counts[char] || 0) + 1) > limit) return false;
    }
    return true;
}

// Динамическая проверка при вводе пароля
document.getElementById("password").addEventListener("input", function() {
    validatePassword(this.value);
});

// Проверка при отправке формы
document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    if (validatePassword(password)) {
        // Добавляем пароль в массив
        savedPasswords.push(password);
        console.log("Сохранённые пароли:", savedPasswords); // Выводим массив в консоль VS Code

        // Очищаем поле ввода
        passwordInput.value = "";

        // Сбрасываем стили требований
        document.querySelectorAll('.valid, .invalid').forEach(el => el.classList.remove('valid', 'invalid'));
    } else {
        console.log("Пароль не соответствует требованиям");
    }
});