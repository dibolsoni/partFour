/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


/**
* Inicialize the game object
* @param (array of javascript objects) phrases - populates phrases to the game
*/
let game = new Game(phrasesJSObj);

let button = document.getElementById('btn__reset');
button.addEventListener('click', function(e) {
    e.preventDefault();
    game.reset();
    game.startGame();
    document.querySelector('#overlay').style.display = 'none';
    //Show phrase
    //console.log('Phrase: ', game.activePhrase.phrase)
});

let btn_letters = Array.from(document.querySelectorAll('#qwerty button'));
btn_letters.forEach((item) => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        game.handleInteraction(e.target);
    })
});

let keyboard_letters = document;
keyboard_letters.addEventListener('keypress',function(e) {
        const guess = btn_letters.filter(item => item.textContent == e.key);
        if (guess[0].className == 'key') {
            game.handleInteraction(guess[0]);
        }
});

const btn_hint = document.querySelector('#scoreboard p');
const hinted = function(e) {
    e.preventDefault();
    if (btn_hint.className || game.missed >= 4) {
        return true;
    }
    btn_hint.className = 'chosen';
    btn_hint.textContent = 'Hint: '+ game.activePhrase.hint;
    game.removeLife();
    btn_hint.disabled = true;
};
btn_hint.className = '';
btn_hint.textContent = 'Click here to receive a hint (loses one try)';
btn_hint.addEventListener('click', hinted);








