(function() {
    'use strict';
    console.log('reading js');

    /* ---------- Journal ---------- */

    // Referencing DOM elements.
    const prevButton = document.querySelector('#prev-button');
    const nextButton = document.querySelector('#next-button');
    const journal = document.querySelector('#journal');
    const paper1 = document.querySelector('#p1');
    const paper2 = document.querySelector('#p2');
    const paper3 = document.querySelector('#p3');
    const back1 = document.querySelector('#b1');

    // Location of the page.
    let currentLocation = 0;
    // Number of total papers in the html.
    let numPapers = 3;
    // Max value of the currentLocation.
    let maxLocation = numPapers + 1;

    // Adding event listeners to refs to DOM elements.
    prevButton.addEventListener('click', prevPage);
    nextButton.addEventListener('click', nextPage);


    // Updates the position of where the journal, prevButton and nextButton are such
    // that they stay in the middle of the page and the buttons aren't covered. Without
    // this, the journal (fully opened) is on the side rather than the middle, and the 
    // buttons gets hidden behind the journal. 
    function openJournal() {
        journal.style.transform = 'translateX(50%)';
        prevButton.style.transform = 'translateX(-250px)';
        nextButton.style.transform = 'translateX(250px)';
        // document.querySelector('.front').style.borderLeft = '4px solid var(--bookbind)';
    };
    

    // Takes a parameter called atStart that goes into an if-else statement depending whether
    // this function is called at the start of the page or not, which affects how much to 
    // transform the journal. This function ensures that the journal stays in the middle of 
    // page and moves the buttons back after the journal is closed.
    function closeJournal(atStart) {
        if (atStart) {
            journal.style.transform = 'translateX(0%)';
        }
        else {
            journal.style.transform = 'translateX(100%)';
        }
        prevButton.style.transform = 'translateX(0px)';
        nextButton.style.transform = 'translateX(0px)';
    };


    // Adds a shadow for the journal at the very beginning, when the nextPage() isn't
    // activated yet. 
    if (currentLocation === 0) {
        paper1.classList.add('flipped-shadow');
        currentLocation++;
    }

    // Function that goes to the next page only if currentLocation is greater
    // than the maxLocation (not being at the end location). Using switch statements,
    // every case adds a class .flipped and updates the z-index to to paper1, paper2, and
    // paper3. On case 1 (currentLocation = 1), it calls a function openJournal(), and on
    // case 3 (currentLocation = 3), it calls a function closeJournal(atStart).
    function nextPage() {
        if (currentLocation < maxLocation) {
            switch(currentLocation) {
                case 1:
                    openJournal();
                    paper1.classList.add('flipped');
                    paper1.style.zIndex = 1;
                    back1.classList.add('flipped-shadow');
                    break;
                case 2: 
                    console.log("case2 of nextpage()");
                    paper2.classList.add('flipped');
                    paper2.style.zIndex = 2;
                    break;
                case 3:
                    paper3.classList.add('flipped');
                    paper3.style.zIndex = 3;
                    paper1.classList.remove('flipped-shadow');
                    let atEnd = false;
                    closeJournal(atEnd);
                    break;
            }
            currentLocation++;
        }
    };


    // Function that goes to the previous page when currentLocation is greater than 1. Uses switch statements
    // to remove the class flipped from paper1, paper2, and paper3, and updates their z-index. For case 2, 
    // the function closeJournal(atStart) is called, and for case 4, the function openJournal() is called.
    function prevPage() {
        if (currentLocation > 1) {
            switch(currentLocation) {
                case 2:
                    let atBeginning = true;
                    closeJournal(atBeginning);
                    paper1.classList.remove('flipped');
                    paper1.style.zIndex = 3;
                    break;
                case 3: 
                    paper2.classList.remove('flipped');
                    paper2.style.zIndex = 2;
                    break;
                case 4:
                    openJournal();
                    paper1.classList.add('flipped-shadow');
                    paper3.classList.remove('flipped');
                    paper3.style.zIndex = 1;
                    break;
            }
            currentLocation--;
        }
    };

    /* ---------- Content ---------- */

    // Referencing to DOM Elems
    const develop1 = document.querySelector('#img-b1-develop');
    const develop2 = document.querySelector('#img-f2-develop');
    const develop3 = document.querySelector('#img-b2-develop');
    // const develop4 = document.querySelector('#img-f3-develop');
    const develop5 = document.querySelector('#img-b3-develop');


    // Adding event listeners to make it seem like the polaroid is developing
    // from black to the photo. It adds the class developing.
    develop1.addEventListener('click', function() {
        const article = document.querySelector('#entry1');

        develop1.classList.add('developing');
        develop1.style.cursor = 'default';

        article.style.visibility = 'visible';
        article.classList.add('reveal');
    });


    develop2.addEventListener('click', function() {
        const article = document.querySelector('#entry2');

        develop2.classList.add('developing');
        develop2.style.cursor = 'default';

        article.style.visibility = 'visible';
        article.classList.add('reveal');
    });

    develop3.addEventListener('click', function() {
        const article = document.querySelector('#entry3');

        develop3.classList.add('developing');
        develop3.style.cursor = 'default';

        article.style.visibility = 'visible';
        article.classList.add('reveal');
    });

    // develop4.addEventListener('click', function() {
    //     const article = document.querySelector('#entry4');

    //     develop4.classList.add('developing');
    //     develop4.style.cursor = 'default';

    //     article.style.visibility = 'visible';
    //     article.classList.add('reveal');
    // });

    develop5.addEventListener('click', function() {
        const article = document.querySelector('#entry5');

        develop5.classList.add('developing');
        develop5.style.cursor = 'default';

        article.style.visibility = 'visible';
        article.classList.add('reveal');
    });
    
})();