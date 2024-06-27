// AJAX запрос для загрузки данных из JSON файла
function loadCharacters() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'dbHeroes.json', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const characters = JSON.parse(xhr.responseText);
            displayCharacters(characters);
        }
    };
    xhr.send();
}

// Отображение карточек героев на странице
function displayCharacters(characters) {
    const charactersContainer = document.getElementById('characters-container');
    charactersContainer.innerHTML = '';

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');
        characterCard.classList.add(character.category); // Добавляем класс карточке для фильтрации

        // Заполнение карточки данными о персонаже
        characterCard.innerHTML = 
            <img src="${character.photo}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p><strong>Настоящее имя:</strong> ${character.realName}</p>
            <p><strong>Фильмы:</strong> ${character.movies.join(', ')}</p>
            <p><strong>Статус:</strong> ${character.status}</p>
        ;

        charactersContainer.appendChild(characterCard);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll(".filter-button");
    const cards = document.querySelectorAll(".character-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            const filter = this.getAttribute("data-filter");

            cards.forEach(card => {
                if (filter === "all" || card.classList.contains(filter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});




// Вызов функции загрузки данных при загрузке страницы
window.onload = loadCharacters;
