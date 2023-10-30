(function(){
    'use strict';
    // console.log("reading js");
    const formElem = document.getElementById('myform');
    const madlibArticle = document.getElementById('madlib');

    formElem.addEventListener('submit', function(event) {
        event.preventDefault();
        const person = document.getElementById('person').value;
        const flavor = document.getElementById('flavor').value;
        const adj1 = document.getElementById('adj1').value;
        const food1 = document.getElementById('food1').value;
        const food2 = document.getElementById('food2').value;
        const food3 = document.getElementById('food3').value;
        const time = document.getElementById('time').value;
        const exclamation = document.getElementById('exclamation').value;
        const adj2 = document.getElementById('adj2').value;
        const verb = document.getElementById('verb').value;
        let myText = document.getElementById('error');

        if (person == '') {
            myText = "Please provide a noun."
            document.querySelector('#person').focus();
        }
        else if (flavor == '') {
            myText = "Please provide a flavor."
            document.querySelector('#flavor').focus();
        }
        else if (adj1 == '') {
            myText = "Please provide an adjective."
            document.querySelector('#adj1').focus();
        }
        else if (food1 == '') {
            myText = "Please provide a food."
            document.querySelector('#food1').focus();
        }
        else if (food2 == '') {
            myText = "Please provide another food."
            document.querySelector('#food2').focus();
        }
        else if (food3 == '') {
            myText = "Please provide one last food."
            document.querySelector('#food3').focus();
        }
        else if (time == '') {
            myText = "Please provide a time."
            document.querySelector('#time').focus();
        }
        else if (exclamation == '') {
            myText = "Please provide an exclamation."
            document.querySelector('#exclamation').focus();
        }
        else if (adj2 == '') {
            myText = "Please provide a second adjective."
            document.querySelector('#adj2').focus();
        }
        else if (verb == '') {
            myText = "Please provide a verb."
            document.querySelector('#verb').focus();
        }
        else {
            myText = `<p>You typed ${person}, ${flavor}, ${adj1}, ${food1}, ${food2}, ${food3}, ${time}, ${exclamation}, ${adj2}, & ${verb}.</p>`
            document.querySelector('#person').value = '';
            document.querySelector('#flavor').value = '';
            document.querySelector('#adj1').value = '';
            document.querySelector('#food1').value = '';
            document.querySelector('#food2').value = '';
            document.querySelector('#food3').value = '';
            document.querySelector('#time').value = '';
            document.querySelector('#exclamation').value = '';
            document.querySelector('#adj2').value = '';
            document.querySelector('#verb').value = '';
        }

        madlibArticle.innerHTML = myText;
    });
})();