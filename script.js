// WEB222SDD MATH GAME
// Yuriy Murenko - 152629184
// Alisa Arutiunian - 149965170

//--------------------DIV SELECTORS-------------------

    //select div that displays the question
const ques = document.querySelector("#question");
    //select the div that will hold the correct answer
const ans = document.querySelector("#answer");
    //array of div id's for the div blocks that hold the wrong answers
const wrongs = document.querySelectorAll(".wrong");
    //select div that displays the title
const title = document.querySelector("#title");
    //select div that display status messages
const message = document.querySelector("#message");
    //select div that displays timer
const timer = document.querySelector("#timer"); //SPAN
    //select div that displays the score
const score = document.querySelector("#score");
    //select div that displays number of misses
const miss = document.querySelector("#miss");
    //select start button
const start = document.querySelector("#startBtn");
    //select rules button
const rule = document.querySelector("#rulesBtn");
    //select the rules popup
const ruleScreen = document.querySelector("#rules");
    //select return button from the rules prompt
const ret = document.querySelector("#returnBtn");
    //select name entry
const name = document.querySelector("#name");
    //select age entry
const age = document.querySelector("#age");
    //select play button
const playgame = document.querySelector("#play");
    //name entry field
const prompt = document.querySelector("#prompt");
    //game component
const game = document.querySelector("#game");
    //menu component
const menu = document.querySelector("#menu");
    //lvl1 button
const lvl1 = document.querySelector('#lvl1');
    //lvl2 button
const lvl2 = document.querySelector('#lvl2');
    //lvl3 button
const lvl3 = document.querySelector('#lvl3');
    //subheading on menu
const sub = document.querySelector("#subtitles");
    //end game screen
const endgame = document.querySelector('#endgame');
    //end game name
const endName = document.querySelector('#endName');
    //end game age
const endAge = document.querySelector('#endAge');
    //end game games complete
const endScore = document.querySelector('#endScore');
    //end game number of misses
const endMiss = document.querySelector('#endMiss');
    //end game screen return button
const endRet = document.querySelector('#returnBtnEnd');
    //select music element
const song = document.getElementById("music");
    //select music button
const musicbtn = document.querySelector("#playpause");

const transition = document.querySelector("#transition");
const countdown = document.querySelector("#countdown");
const correctWrong = document.querySelector("#correctWrong");

//----------------------------------------------------

//---------------------GLOBAL VARS--------------------

class player {
    constructor(pname, page, pscore, pmiss){
        this.name = pname;
        this.age = page;
        this.num_correct = pscore;
        this.misses = pmiss;
    }
    DispName(){
        return "Name: "+this.name;
    }
    DispAge(){
        return "Age: "+this.age;
    }
    DispScore(){
        return "Score: "+this.num_correct;
    }
    DispMiss(){
        return "Missed: "+this.misses;
    }

}

//which game is being played
//1 - ADDITION, 2 - SUBTRACTION, 3 - DIVISION
var game_mode = 0;
var counter = 0;
let interval;
let fadeInterval;
//1 - PLAY, 2 = PAUSE
var musicstate = 1;
const m_range_y = window.innerHeight/30;
const m_range_x = window.innerWidth/30;
const viewport_y = window.innerHeight;
const viewport_x = window.innerWidth;


//----------------------------------------------------

//------------------------TIMER-----------------------
function countDown() {
    counter--;
    timer.innerHTML = counter;

    if (counter === 0 && game_mode === 3) {
        counter = -5;
    }

    if(counter === 0) {
        // show the transition
        game.style.display = "none";
        transition.style.display = "block";
        countdown.innerHTML = (5 + counter);
    } else if (counter < 0 && counter > -5) {
        // countdown 4, 3, 2, 1
        countdown.innerHTML = (5 + counter);
    } else if (counter === -5) {
        game.style.display = "block";
        transition.style.display = "none";

        clearInterval(interval);

        if(game_mode === 1) {
            interval = setInterval(countDown,1000);
        } else if(game_mode === 2) {
            interval = setInterval(countDown,1000);
        } else if (game_mode === 3) {
            EndScreen();
        }

        game_mode += 1;
        num_correct = 0;
        Play(true);
        console.log('mode: '+ game_mode);
    }
}

function fade() {
    correctWrong.innerHTML="";
    correctWrong.style.display="node";
    clearInterval(fadeInterval);
    fadeInterval = undefined;
}
//----------------------------------------------------

/**
 *
 * @param min
 * @param max
 * @param dec number of decimals
 * @returns {number}
 */
function random(min, max, dec = 0) {
    const power = Math.pow(10, dec);
    return Math.floor((Math.random() * (max - min + 1) + min) * power) / power;
}

//--------------------GAME FUNCTIONS------------------
{
    function EndScreen(){
        game.style.display = "none";
        ruleScreen.style.display = "none";
        prompt.style.display = "none";
        menu.style.display = "none";
        endgame.style.display = "block";
        endName.innerHTML = player1.DispName();
        endAge.innerHTML = player1.DispAge();
        endScore.innerHTML = player1.DispScore();
        endMiss.innerHTML = player1.DispMiss();
        clearInterval(interval);
    }

    function Play(resetTimer) {
        initPos(ans);
        for(var i = 0; i < wrongs.length; i++){
            initPos(wrongs[i]);
        }

        switch(game_mode) {
            case 1:
                if (resetTimer) counter = 90;
                GameAdd();
                WrongMotion();
                AnsMotion();
                break;
            case 2:
                if (resetTimer) counter = 120;
                GameSub();
                WrongMotion();
                AnsMotion();
                break;
            case 3:
                if (resetTimer) counter = 150;
                GameDivision();
                WrongMotion();
                AnsMotion();
                break;
        }

        timer.innerHTML = counter;
    }

    const reshuffle = () => {

        ans.style.display = "none";
        initPos(ans);
        ans.style.display = "block";
        initPos(ans);

        for (var i = 0; i < wrongs.length; i++)
        {
            wrongs[i].style.display = "none";
            initPos(wrongs[i]);
            wrongs[i].style.display = "block";
            initPos(wrongs[i]);
        }

    };
    function setImage(img, element){
        var one = "url(images/jellyfish.png)";
        var two = "url(images/shell.png)";
        var three = "url(images/starfish.png)";
        if (img == 1){
            element.style.backgroundImage = one;
        }
        else if (img == 2){
            element.style.backgroundImage = two;
        }
        else if (img == 3){
            element.style.backgroundImage = three;
        }
    }
    function Correct(){//correct answer, track how many right and game state

        reshuffle();

        player1.num_correct += 1;
        UpdateScore();

        correctWrong.innerHTML="Correct!";
        correctWrong.style.display="block";
        if (fadeInterval) {
            clearInterval(fadeInterval);
        }
        fadeInterval = setInterval(fade, 2000);

        Play(false);

    }
    function Wrong(){

        reshuffle();
        if(player1.num_correct > 0){

            player1.num_correct -= 1;
        }
        if(player1.misses === 5){
            EndScreen();
        }

        player1.misses+=1;
        UpdateScore();

        correctWrong.innerHTML="Wrong!";
        correctWrong.style.display="block";
        if (fadeInterval) {
            clearInterval(fadeInterval);
        }
        fadeInterval = setInterval(fade, 2000);
    }
    function GameAdd(){//additon game
        message.innerHTML="Addition game!";

        var val1 = Math.floor( Math.random() * 26)+1;
        var val2 = Math.floor( Math.random() * 10)+1;
        var correct = val1 + val2;
        ques.innerHTML = val1 + '+' + val2 + '= ?';
        ans.innerHTML=correct;
        setImage(1, ans);
        var prev_rand = [0,0,0,0,0,0,0,0];
        for (var i = 0; i < wrongs.length; i++){
            setImage(1, wrongs[i]);
            var rand;
            do {
                rand = Math.floor(Math.random() * Math.floor(correct + 5) + 1);
            } while (prev_rand.includes(rand) || rand == correct);

            wrongs[i].innerHTML = rand;
            prev_rand[i] = rand;
        }
    }
    function GameSub(){//subtraction game
        message.innerHTML="Subtraction game!";

        var val1 = Math.floor( Math.random() * 26)+1;
        var val2 = Math.floor( Math.random() * 10)+1;
        var correct;
        if(val1>val2){
            correct = val1 - val2;
            ques.innerHTML = val1 + '-' + val2 + '= ?';
        }
        else if(val1<val2){
            correct = val2 - val1;
            ques.innerHTML = val2 + '-' + val1 + '= ?';
        }
        else if(val1 == val2){
            val1 -= 1;
            correct = val2 - val1;
            ques.innerHTML = val2 + '-' + val1 + '= ?';
        }

        ans.innerHTML = correct;
        setImage(2, ans);
        var prev_rand = [0,0,0,0,0,0,0,0];
        var rand;
        for (var i = 0; i < wrongs.length; i++){
            setImage(2, wrongs[i]);
            do {
                rand = Math.floor( Math.random() * 10)+1;
            } while (prev_rand.includes(rand) || rand==correct);

            wrongs[i].innerHTML=rand;
            prev_rand[i] = rand;
        }

    }
    function GameDivision(){//division game
        message.innerHTML="Division game!";

        var val1 = Math.floor( Math.random() * 26)+1;
        var val2 = Math.floor( Math.random() * 10)+2;

        if (val1 > val2){
        while(!Number.isInteger(val1/val2))
            {
            val1 -= 1;
            }
        correct = val1/val2;
        ques.innerHTML = `${val1} / ${val2} = ?`

        } else if(val2 > val1){
        while(!Number.isInteger(val2/val1))
            {
            val2 -= 1;
            }
        correct = val2/val1;
        ques.innerHTML = `${val2} / ${val1} = ?`

        } else {

            correct = val1/val2;
        ques.innerHTML = `${val1} / ${val2} = ?`
        }
        ans.innerHTML = correct;
        setImage(3, ans);
        var prev_rand = [0,0,0,0,0,0,0,0];
        var rand;
        for (var i = 0; i < wrongs.length; i++){

            do {
                rand = Math.floor( Math.random() * 10)+1;
            } while (prev_rand.includes(rand) || rand==correct)
            setImage(3, wrongs[i]);
            wrongs[i].innerHTML=rand;
            prev_rand[i] = rand;
            }
    }
    function initPos(element){//initialize random position for a given element
        /*randY = Math.floor(Math.random() * 1001) - 500;
        randX = Math.floor(Math.random() * 1001) - 500;
        element.style.top = (viewport_y/4) + randY + "px";
        element.style.left = (viewport_x/4)+ randX + "px";*/

        randY = random(element.offsetHeight + 1, viewport_y - (element.offsetHeight + 1));
        randX = random(element.offsetWidth + 1, viewport_x - (element.offsetWidth + 1));
        element.style.top = randY + "px";
        element.style.left = randX + "px";

    }
    function AnsMotion() {//move the answer div around
        var rect = ans.getBoundingClientRect();
        var randY = Math.floor(Math.random() * m_range_y) - (m_range_y/2);
        var randX = 3 * (Math.floor(Math.random() * m_range_x) - (m_range_x/2));

        if(BoundryCheck(ans)!=0) {
            initPos(ans);
        } else{
            randY = random(ans.offsetHeight + 1, viewport_y - (ans.offsetHeight + 1));
            randX = random(ans.offsetWidth + 1, viewport_x - (ans.offsetWidth + 1));
            ans.style.top = randY + "px";
            ans.style.left = randX + "px";
        }
    }
    function WrongMotion(){//move the wrong answers around
        var rect;
        var randX;
        var randY;
        var posCheck;
        for (var i = 0; i < wrongs.length; i++) {
            rect = wrongs[i].getBoundingClientRect();
            posCheck = BoundryCheck(wrongs[i]);

            if (posCheck !== 0) {
                initPos(wrongs[i]);
            } else {
                randY = random(wrongs[i].offsetHeight + 1, viewport_y - (wrongs[i].offsetHeight + 1));
                randX = random(wrongs[i].offsetWidth + 1, viewport_x - (wrongs[i].offsetWidth + 1));
                wrongs[i].style.top = randY + "px";
                wrongs[i].style.left = randX + "px";
            }
        }
    }
    function BoundryCheck(element){//check if a given element is out of the boundries of the viewport
        // 0 - not out of bounds
        // 1 - out of left boundry
        // 2 - out of right boundry
        // 3 - out of top boundry
        // 4 - out of bottom boundry
        var PosState = 0;
        var boundX = viewport_x - (m_range_x*3);
        var boundY = viewport_y - (m_range_y*3);
        var rect = element.getBoundingClientRect();
        if (rect.left < (m_range_x)){
            PosState = 1;
        }
        else if (rect.left > boundX){
            PosState = 2;
        }
        else if (rect.top < (m_range_y)){
            PosState = 3;
        }
        else if (rect.top > boundY){
            PosState = 4;
        }
        return PosState;
    }
    function UpdateScore(){
        score.innerHTML = "Score: "+player1.num_correct;
        miss.innerHTML = "Missed: "+player1.misses;

    }
}
//----------------------------------------------------

//--------------------MENU FUNCTIONS------------------
{
    function showRules(){
        console.log('show rules');
        prompt.style.display = "none";
        menu.style.display = "none";
        ruleScreen.style.display = "block";
    }
    function returnMenu(){
        game.style.display = "none";
        ruleScreen.style.display = "none";
        prompt.style.display = "none";
        endgame.style.display = "none";
        menu.style.display = "block";
        counter = 0;
        player1.num_correct = 0;
        player1.misses = 0;

        game_mode = 0;
        lvl1.style.borderStyle = "none";
        lvl2.style.borderStyle = "none";
        lvl3.style.borderStyle = "none";
    }
    function playerInfo(){
        if(game_mode == 0){
            sub.innerHTML = "Select a game mode first!";
        }
        else{
            prompt.style.display = "block";
            menu.style.display = "none";
        }
    }

    function Start(){
        game.style.display = "block";
        prompt.style.display = "none";
        menu.style.display = "none";
        player1 = new player(name.value, age.value, 0, 0);
        title.innerHTML = player1.DispName()+" "+player1.DispAge();
        Play(true);
        interval = setInterval(countDown,1000);
    }

    function Set1(){
        game_mode = 1;
        lvl1.style.borderStyle = "solid";
        lvl2.style.borderStyle = "none";
        lvl3.style.borderStyle = "none";
    }

    function Set2(){
        game_mode = 2;
        lvl1.style.borderStyle = "none";
        lvl2.style.borderStyle = "solid";
        lvl3.style.borderStyle = "none";
    }

    function Set3(){
        game_mode = 3;
        lvl1.style.borderStyle = "none";
        lvl2.style.borderStyle = "none";
        lvl3.style.borderStyle = "solid";
    }

}
//----------------------------------------------------

//------------------------MUSIC-----------------------
{
    function music(){
        song.play();
    }
    function play_pause(){
        if(musicstate == 1){
            musicstate = 2;
            song.pause();
        }
        else if(musicstate == 2){
            musicstate = 1;
            song.play();
        }
    }
}
//----------------------------------------------------

//-------------------EVENT LISTENERS------------------
window.addEventListener("load", music);
musicbtn.addEventListener("click", play_pause);
ans.addEventListener("click", Correct);
for (var i = 0; i < wrongs.length; i++){
    wrongs[i].addEventListener("click", Wrong);
}
start.addEventListener("click", playerInfo);
playgame.addEventListener("click", Start);
rule.addEventListener("click", showRules);
ret.addEventListener("click", returnMenu);
lvl1.addEventListener("click", Set1);
lvl2.addEventListener("click", Set2);
lvl3.addEventListener("click", Set3);
endRet.addEventListener("click", returnMenu);

//----------------------------------------------------


//----------------------INTERVALS---------------------
window.setInterval(AnsMotion, 3000); // try to kill this timer and call it again when needed
window.setInterval(WrongMotion, 3000); // try to kill this timer and call it again when needed
//----------------------------------------------------

//-------------CURSOR--------------------------------
var $ = document.querySelector.bind(document);
var $on = document.addEventListener.bind(document);
var xmouse, ymouse;
$on('mousemove', function (e) {
    xmouse = e.clientX || e.pageX;
    ymouse = e.clientY || e.pageY;
});

var tag = $('#question');
var key = -1;
var followMouse = function followMouse() {
    key = requestAnimationFrame(followMouse);
    tag.style.left = xmouse + 'px';
    tag.style.top = ymouse + 'px';
};
