fetch('kerdesek.json')
    .then(response => response.json())
    .then(data => {
        const questionsContainer = document.getElementById('questions-container');

        Object.keys(data).forEach(key => {
            const questionData = data[key];
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = questionData.question;
            questionElement.appendChild(questionTitle);

            questionData.answers.forEach(answer => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question-${key}`;
                input.value = answer.value;
                label.appendChild(input);
                label.appendChild(document.createTextNode(answer.option));
                questionElement.appendChild(label);
                questionElement.appendChild(document.createElement('br'));
            });

            questionsContainer.appendChild(questionElement);
        });
    })
    .catch(error => console.error('    hiba a kérdések betöltésekor:', error));

document.getElementById('submit-button').addEventListener('click', () => {
    let totalScore = 0;
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption) {
            totalScore += parseInt(selectedOption.value, 10);
        }
    });

    const resultContainer = document.getElementById('result');
    let resultMessage = '';

    if (totalScore >= 13 && totalScore <= 21) {
        resultMessage = 'Gratulálunk, te tudod, hogy kell igazán egészségesen élni. Ami nagyon fontos, hogy továbbra is figyelj oda a megfelelő hidratálásra és a rostbevitelre. Ha még nem próbáltad, akkor itt az ideje kipróbálni az alternatív fehérje megoldásokat is. Szuper egészséges és finom tud lenni. Egyre vigyázz, azért ne hajtsd túl magad. ;)';
    } else if (totalScore >= 22 && totalScore <= 30) {
        resultMessage = 'Jó úton jársz, de még van mit javítani az étkezéseden. Figyelj a rost és a megfelelő fehérje bevitelre (hal, pulyka vagy csirke legyen a fő és a hüvelyes zöldségek). Nézz utána a mediterrán étrendnek, a tested meg fogja hálálni. A nassolást, amennyire lehet, mellőzd. A nyugodt alváshoz pedig elengedhetetlen a jó környezet, a sötét szoba. Nyugi, nincs szörny az ágy alatt. ;)';
    } else if (totalScore >= 31 && totalScore <= 39) {
        resultMessage = 'Ajjaj, nagy a baj. Nem figyelsz az étkezésedre. Ha ezen nem változtatsz, komoly egészségügyi következményei is lehetnek (mint a cukorbetegség, a magas vérnyomás vagy a korai csontritkulás).';
    }

    resultContainer.textContent = resultMessage;
});