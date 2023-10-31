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
            console.log("inside if person")
            myText.innerHTML = "<p>*Please provide a noun.</p>"

            console.log(myText);
            document.querySelector('#person').focus();
        }
        else if (flavor == '') {
            myText.innerHTML = "<p>*Please provide a flavor.</p>"
            document.querySelector('#flavor').focus();
        }
        else if (adj1 == '') {
            myText.innerHTML = "<p>*Please provide an adjective.</p>"
            document.querySelector('#adj1').focus();
        }
        else if (food1 == '') {
            myText.innerHTML = "<p>*Please provide a food.</p>"
            document.querySelector('#food1').focus();
        }
        else if (food2 == '') {
            myText.innerHTML = "<p>*Please provide another food.</p>"
            document.querySelector('#food2').focus();
        }
        else if (food3 == '') {
            myText.innerHTML = "<p>*Please provide one last food.</p>"
            document.querySelector('#food3').focus();
        }
        else if (time == '') {
            myText.innerHTML = "<p>*Please provide a duration.</p>"
            document.querySelector('#time').focus();
        }
        else if (exclamation == '') {
            myText.innerHTML = "<p>*Please provide an exclamation.</p>"
            document.querySelector('#exclamation').focus();
        }
        else if (adj2 == '') {
            myText.innerHTML = "<p>*Please provide a second adjective.</p>"
            document.querySelector('#adj2').focus();
        }
        else if (verb == '') {
            myText.innerHTML = "<p>*Please provide a verb.</p>"
            document.querySelector('#verb').focus();
        }
        else {
            document.getElementById('overlay').className = 'showing';

            myText = `<p>It's ${person}'s birthday tomorrow, so let's bake them a cake! Since they love ${flavor}, let's make them a ${flavor} cake.</p> <p>To make this taste ${adj1}, let's add some special ingredients of ${food1}, ${food2}, and ${food3}.</p> <p>Mix it all together and bake it for ${time} minute and it's ready. ${exclamation}! This is so ${adj2}. I hope they ${verb} this cake.</p>`
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