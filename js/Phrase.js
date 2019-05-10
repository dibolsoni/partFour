/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
    * Display phrase on game board
    */
    addPhraseToDisplay() {
        let ul = document.querySelector('#phrase ul');
        let li;
        let letters = Array.from(this.phrase);
        letters.forEach((item) => {
            li = document.createElement('li');
            if (!/\s/g.test(item)) {
                li.textContent = item;
                li.className = `hide letter ${item}`
                ul.appendChild(li)
            } else {
                li.textContent = '';
                li.className = 'space';
                ul.appendChild(li)
            }
        })
    };

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {
        if (this.phrase.includes(letter)) {
            return true;
        } else {
            return false;
        }
    }

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        let lis = Array.from(document.querySelectorAll('#phrase li'));
        let matched = lis.filter(item => item.textContent == letter );
        matched.forEach((item) => {
            item.className = `show letter ${item.textContent}`;
        });
    }
}
