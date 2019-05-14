/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
     constructor(phrasesJSObj) {
        this.missed = 0;
        this.phrases = this.createPhrases(phrasesJSObj);
        this.activePhrase = null;   
    }
    /**
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */
   createPhrases(arrPhrase) {
    let newarray = [];
    const total = arrPhrase.length;
    for (let i = 0; i < total; i++) {
        newarray.push(new Phrase(arrPhrase[i].quote, arrPhrase[i].hint));
    }
    return newarray;
    } 

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    get RandomPhrase() {
        const phrasesmax = this.phrases.length;
        const random = Math.floor(Math.random() * phrasesmax)
        this.activePhrase = this.phrases[random];
        return this.activePhrase;
    };

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        this.activePhrase = this.RandomPhrase;
        this.activePhrase.addPhraseToDisplay();
    }
    
    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const letters = document.querySelectorAll('#phrase ul li');
        let errors = [];
        letters.forEach((item) => {
            if (item.className.includes('hide')) {
                errors.push(item);
            }
        });
        if (errors.length == 0) {
            return true;
        } else {
            return false;
        }
    
    };

    /**
    * Dencreases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        this.missed++;
        const livehearts = 'liveHeart.png';
        const losthearts = 'lostHeart.png';
        let lis = Array.from(document.querySelectorAll('#scoreboard li'));
        if (this.missed >= lis.length) {
            this.gameOver(false);
        }
        lis.map(item => item.children[0])
            .reduce((acc, item, i) => {
                this.missed <= i ?
                    item.src = item.src.replace(losthearts, livehearts) :
                    item.src = item.src.replace(livehearts, losthearts) ;
                return acc + item;
            }, '');

    };

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        const overlay = document.querySelector('#overlay');
        const h1 = document.querySelector('#game-over-message');
        overlay.style.display = '';
        if (gameWon) {
            overlay.className = 'win';
            h1.textContent = 'Nice Work! Play again!';
        } else {
            overlay.className = 'lose';
            h1.textContent = 'Wow almost there, Try again!'
        }

    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonTargetElement) button - The target of clicked button element
    */
    handleInteraction(target) {
        const guessed = target.textContent;
        if (this.activePhrase.checkLetter(guessed)) {
            this.activePhrase.showMatchedLetter(guessed);
            target.className = 'chosen';
            if (this.checkForWin()) {
                this.gameOver(true);
            };
        } else {
            target.className = 'wrong';
            this.removeLife();
        }
        target.disabled = true;
    }

    /**
    * reset all elements used
    */
    reset() {
        // Phrase element reset
        const ul = document.querySelector('#phrase ul');
        const total = ul.childElementCount;
        for (let i = 0; i < total; i++) {
            ul.removeChild(ul.firstElementChild);
        }
        // btn letters reset
        const btn_letters = Array.from(document.querySelectorAll('#qwerty button'));
        let result = btn_letters
                        .filter(item => item.className != 'key')
                        .map(item => {
                            item.className = 'key';
                            item.disabled = false; 
                        });

        // missed reset
        this.missed = 0;

        // img hearts reset
        const livehearts = 'liveHeart.png';
        const losthearts = 'lostHeart.png'
        const imgs = Array.from(document.querySelectorAll('.tries'));
        result = imgs
                    .filter(item =>  !item.children[0].src.includes(livehearts))
                    .map(item => item.children[0].src = item.children[0].src.replace(losthearts,livehearts));

                        
        // btn hint reset
        const btn_hint = document.querySelector('#scoreboard p');
        btn_hint.textContent = 'Click here to receive a hint (loses one try)';
        btn_hint.className = '';
        

 
    }
}
