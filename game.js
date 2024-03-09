    words = [
        {
            "w1" : "London",
            "w2" : "Paris"
        },
        {
            "w1" : "Strawberry",
            "w2" : "Cherry"
        },
        {
            "w1" : "Singapor",
            "w2" : "Hong Kong"
        },
        {
            "w1" : "Captain America",
            "w2" : "Iron Man"
        },
        {
            "w1" : "Bubble Gum",
            "w2" : "Lolipop"
        },
        {
            "w1" : "Escalator",
            "w2" : "Elevator"
        },
        {
            "w1" : "Onion",
            "w2" : "Garlic"
        },
        {
            "w1" : "Gravy",
            "w2" : "Curry"
        },
        {
            "w1" : "Roti",
            "w2" : "Bread"
        },
        {
            "w1" : "Ice cream",
            "w2" : "Yogurt"
        }
    ]

function inarray(arr, ele) {
    let flag = false
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == ele) {
            flag = true
        }
    }
    return flag
}


function passnumvalues(event){
    event.preventDefault()
    const game = {}
    let entervalues = document.getElementById("entervalues")
    game.num_of_players =  document.getElementById("no_players").value
    game.num_of_undercover = document.getElementById("no_undercover").value
    game.num_of_mr_white = document.getElementById("no_mrwhite").value
    let plus = parseInt(game.num_of_mr_white) + parseInt(game.num_of_undercover)
    if ((game.num_of_players >= 3) && (game.num_of_undercover <= parseInt(0.4*game.num_of_players)) && (game.num_of_mr_white <= parseInt(0.2*game.num_of_players)) && (plus <= parseInt(0.5*game.num_of_players))){
        entervalues.disabled = true
        document.getElementById("errorbox").style.display = "none"
        game.undercover = []         
        makediv(game)
    }
    else{
        document.getElementById("errorbox").style.display = "block"
    }
}


function makediv(game) {
    let main = document.getElementById("main")
    var formatted;
    let names = []
    game.players = []
    game.undercover = []
    game.mrwhite = []
    for (let i = 0; i < game.num_of_players; i++) {
        formatted = `<label>Enter the ${i+1}'s player Name </label><input type='text' id = 'names${i}' /> <br/>`
        // main.append(formatted)
        main.innerHTML += formatted
    }

    main.innerHTML += `<button id="generatebtn" class="popup-button">Generate Cards<button/>`
    
    document.getElementById('generatebtn').addEventListener('click', () => {
        game.players.length = 0
        game.undercover.length = 0
        game.mrwhite.length = 0
        let selected_word = words[parseInt(Math.random() * words.length)];
        let un_word = (parseInt(Math.random() * 2) == 0) ? selected_word.w1 : selected_word.w2;
        let civ_word = (un_word == selected_word.w1) ? selected_word.w2 : selected_word.w1;
        let generatebtn = document.getElementById("generatebtn")
        generatebtn.disabled = true
        let count = 0
        do {
            let un = parseInt(Math.random() * game.num_of_players);
            if (!inarray(game.undercover, un)) {
                count++
                game.undercover.push(un)
            }
        } while (count != game.num_of_undercover);
        if (game.num_of_mr_white != 0) {  
            count = 0
            do {
                let white = parseInt(Math.random() * game.num_of_players);
                if (!inarray(game.undercover, white) && !inarray(game.mrwhite, white)) {
                    count++
                    game.mrwhite.push(white)
                }
            } while (count != game.num_of_mr_white);
        }
        for(let i = 0 ; i < game.num_of_players; i++){
            names.push(document.getElementById(`names${i}`).value);
        }
            for (let i = 0; i < game.num_of_players; i++) {
                if(inarray(game.undercover, i)){
                    const player = {
                        "name" : names[i],
                        "role" : "undercover",
                        "word" : un_word,
                        "score" : 0
                    }
                    game.players.push(player)
                }
                else if(inarray(game.mrwhite, i)){
                    const player = {
                        "name" : names[i],
                        "role" : "mrwhite",
                        "word" : "You are Mr.White",
                        "score" : 0
                    }
                    game.players.push(player)
                }
                else {
                    const player = {
                        "name" : names[i],
                        "role" : "civillian",
                        "word" : civ_word,
                        "score" : 0
                    }
                    game.players.push(player)
                }
            }
        let cardbox = document.getElementById("cardbox")
        for (let j = 0; j < game.players.length; j++) {

            formattedcard = `<div id="card${j}" class="card firstcard rounded-xl shadow ">
            <img class="pickme" src="./img/pickme.png" alt="img">
            </div>  
            <div id="othercard${j}" style="display: none" class="card othercard rounded-xl shadow">
            <div id="othername${j}" class="othername ?leading-5 text-center"></div>
            <div class="otherimg">
                <img src="./img/4049905-200.png" alt="img">
            </div>
            <div class="othertext ?leading-5 text-center">Your word is :</div>
            <div id="otherword${j}" class="otherword ?leading-5 text-center"></div>
            <div class="okaybtn">
            <button id="lastcardbutton${j}" class="popup-button">OKAY</button>
            </div>
            </div>  
            <div id="lastcard${j}" style="display: none" class="card lastcard rounded-xl shadow">
            <div id="lastfirstletter${j}" class="namefirstletter"></div>
            <div id="lastname${j}" class="namewhole mt-5"></div>
            </div>`
            cardbox.innerHTML += formattedcard
        }

            let flag = true
            let countname = 0
            let turn = document.getElementById("turn")
            for (let k = 0; k < game.players.length; k++) {
                    let card_id = `card${k}`
                    let othercard_id = `othercard${k}`
                    let lastcard_id = `lastcard${k}`
                    let lastcardbutton = `lastcardbutton${k}`
                    turn.innerHTML = `${game.players[countname].name}'s Turn`
                    document.getElementById(card_id).addEventListener('click', () => {
                        if(flag == true) {
                            flag = false
                            let card = document.getElementById(card_id)
                            let othercard = document.getElementById(othercard_id)
                            card.classList.add("selected")
                            card.style.display = "none";
                            othercard.style.display = "block";
                            document.getElementById(`othername${k}`).innerHTML = `${game.players[countname].name}`
                            document.getElementById(`otherword${k}`).innerHTML = `${game.players[countname].word}`
                            document.getElementById(lastcardbutton).addEventListener('click', () => {
                                flag = true
                                othercard.style.display = "none";
                                let lastcard = document.getElementById(lastcard_id)
                                document.getElementById(`lastfirstletter${k}`).innerHTML = `${game.players[countname].name[0]}`
                                document.getElementById(`lastname${k}`).innerHTML = `${game.players[countname].name}'s Card`
                                lastcard.style.display = "block";
                                countname++
                                turn.innerHTML = `${game.players[countname].name}'s Turn`
                        })
                        if(countname == game.players.length-1) {
                            turn.innerHTML = ''
                            gotovote(game)
                        }
                    }
                    })
            }
    })
}

function gotovote(game) {
    let un_count = 0
    let civ_count = 0
    let white_count = 0
    let vote = document.getElementById("vote")
    vote.innerHTML += `<button id="votebtn" class="popup-button">Go to Vote</button>`

    let votebtn = document.getElementById("votebtn")
    votebtn.addEventListener('click', () => {
        votebtn.disabled = true
        let votecards = document.getElementById("votecards")
        for (let i = 0; i < game.players.length; i++) {
            votecards.innerHTML += `<button id="votename${i}" class="popup-button">${game.players[i].name}</button>`
        }
        un_count = 0
        civ_count = game.num_of_players - game.num_of_undercover
        let voteanswer = document.getElementById("voteanswer")
        for (let j = 0; j < game.players.length; j++) {
                let voted = document.getElementById(`votename${j}`)
                voted.addEventListener('click', () => {
                    if(game.players[j].role == "undercover"){
                        voted.disabled = true;
                        voteanswer.innerHTML = `Eliminated ${game.players[j].name}, <br> An Undercover is Discovered!!!`
                        un_count++
                    }
                    else if(game.players[j].role == "mrwhite"){
                        voted.disabled = true;
                        voteanswer.innerHTML = `Eliminated ${game.players[j].name}, <br> Mr.White is found!!`
                        white_count++
                        let white_word = prompt("Guess the civillian word, If you guess correctly then you win!!")
                        console.log(white_word);
                    }
                    else {
                        voted.disabled = true;
                        voteanswer.innerHTML = `Eliminated ${game.players[j].name}, <br> A Civillian was Eliminated!!!`
                        civ_count--
                    }
                    
                    if(game.num_of_undercover >= civ_count){
                        voteanswer.innerHTML = "Boooooo !! You couldn't guessed all the Undercover!! <br> Undercover wins!!"
                        let playagaindiv = document.getElementById("playagaindiv")
                        playagaindiv.innerHTML = `<button id="playagain" class="popup-button">Play Again!!!</button>`
                        votecards.style.display = "none"
                        document.getElementById("playagain").addEventListener('click', () => {
                            document.getElementById("cardbox").innerHTML = ''
                            document.getElementById("vote").innerHTML = ''
                            document.getElementById("votecards").innerHTML = ''
                            document.getElementById("voteanswer").innerHTML = ''
                            document.getElementById("generatebtn").disabled = false
                            document.getElementById("playagain").style.display = "none"
                            document.getElementById("votecards").style.display = "block"
                        })
                    }
                    else if(un_count == game.undercover.length){
                        voteanswer.innerHTML = "Woohoo!! You guessed all the Undercover!! Civillian wins!!"
                        let playagaindiv = document.getElementById("playagaindiv")
                        playagaindiv.innerHTML = `<button id="playagain" class="popup-button">Play Again!!!</button>`
                        votecards.style.display = "none"
                        document.getElementById("playagain").addEventListener('click', () => {
                            document.getElementById("cardbox").innerHTML = ''
                            document.getElementById("vote").innerHTML = ''
                            document.getElementById("votecards").innerHTML = ''
                            document.getElementById("voteanswer").innerHTML = ''
                            document.getElementById("generatebtn").disabled = false
                            document.getElementById("playagain").style.display = "none"
                            document.getElementById("votecards").style.display = "block"
                        })
                    }
                    else if(white_count == game.mrwhite.length && white_count != 0){
                        voteanswer.innerHTML = "Woohoo!! You eliminated Mr.White"
                        let playagaindiv = document.getElementById("playagaindiv")
                        // playagaindiv.innerHTML = `<button id="playagain" class="popup-button">Play Again!!!</button>`
                        // votecards.style.display = "none"
                        // document.getElementById("playagain").addEventListener('click', () => {
                        //     document.getElementById("cardbox").innerHTML = ''
                        //     document.getElementById("vote").innerHTML = ''
                        //     document.getElementById("votecards").innerHTML = ''
                        //     document.getElementById("voteanswer").innerHTML = ''
                        //     document.getElementById("generatebtn").disabled = false
                        //     document.getElementById("playagain").style.display = "none"
                        //     document.getElementById("votecards").style.display = "block"
                        // })
                    }
                })
            }


    })
}

function undercoverdiscovered(game) {
    
}