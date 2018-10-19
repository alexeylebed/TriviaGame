let config = [
    {
        id:  1,
        question: 'Alexandr Pushkin was born in',
        answers:['1799', '1800', '1801', '1802'],
        rightanswerindex: 0
    },
    {
        id: 2,
        question: 'This car brand is not German',
        answers: ['Audi', 'BMW', 'Mercedes', 'Tesla'],
        rightanswerindex: 3
    },
    {
        id: 3,
        question: 'Number of states in the USA',
        answers: ['53', '52', '51', '50'],
        rightanswerindex: 3
    },
    {
        id: 4,
        question: 'The coldest city in the world',
        answers: ['San Francisco', 'Yakutsk', 'Toronto', 'London'],
        rightanswerindex: 1 
    },
    {
        id: 5,
        question: 'World bench press record',
        answers: ['804 lbs', '1102 lbs', '1221 lbs', '608 lbs'],
        rightanswerindex: 1
    },
];

let timeforanswer = 9;
let timeleft = timeforanswer;
let htmlanswers = [];
let clickedanswerid;
let rightanswerindex;
let isrunning = false;
let timerID;
let questionid;

let timer = document.getElementById('timer');
let htmlquestion = document.getElementById('question');
let parent = document.getElementById('answers');
let timingblock = document.getElementById('timing');
let actionbutton = document.getElementById('start');
let answersblock = document.getElementById('answers');
let result = document.getElementById('result');
let wingif = document.getElementById('wingif');
let losegif = document.getElementById('losegif');


function checktime(){
    if(timeleft > 0){
        timer.innerHTML = timeleft - 1;
        timeleft--;
    } else{
        alert('Time is up bro! You lose');
        reboot();

    }
}

function reboot(){
    isrunning = false;
    timingblock.style.display = 'none';
    actionbutton.style.display = 'block';
    htmlanswers[0].style.display = 'none';
    htmlanswers[1].style.display = 'none';
    htmlanswers[2].style.display = 'none';
    htmlanswers[3].style.display = 'none';
    htmlquestion.style.display = 'none';
    result.style.display = 'none';
    losegif.style.display = 'none';
    wingif.style.display = 'none';
    clearInterval(timerID);
}

function nextquestion(){
    htmlanswers[0].innerHTML = '';
    htmlanswers[1].innerHTML = '';
    htmlanswers[2].innerHTML = '';
    htmlanswers[3].innerHTML = '';
    timeleft = timeforanswer;
    rightanswerindex = loadquestion(); 
}

function chosequestion(){
    questionid = Math.floor(Math.random(0 , config.length)*config.length);
    return config[questionid];
}

function loadquestion(){
    let topic = chosequestion();
    console.log(topic);
    let questiontext = topic.question;
    let answers = topic.answers;

    htmlquestion.innerHTML = questiontext;


    for(i = 0; i <=3; i++){
        htmlanswers[i] = document.getElementById(i);
        htmlanswers[i].innerHTML = answers[i];
        htmlanswers[i].id = i;
        htmlanswers[i].className = 'answers';
        htmlanswers[i].style.display = 'block';
        //parent.appendChild(htmlanswers[i]);
    }
    console.log('Corect anwser index is ' + topic.rightanswerindex);
    return  topic.rightanswerindex;
}

function checkanswer(answer){
    if(answer.className == 'answers'){
        if(answer.id == rightanswerindex){
            result.innerHTML = 'Its correct bro!';
            result.style.display = 'block';
            wingif.style.display = 'block';
            losegif.style.display = 'none';
            nextquestion();
            } else {
            result.innerHTML = 'You lose bro!';
            result.style.display = 'block';
            wingif.style.display = 'none';
            losegif.style.display = 'block';
            clearInterval(timerID);
            setTimeout(reboot , 3000);  
        }
    }
}

function run(){
    if(isrunning){
        rightanswerindex = loadquestion();
        
        timingblock.style.display = 'block';
        actionbutton.style.display = 'none';
        timer.innerHTML = timeleft;
        timerID  = setInterval(checktime , 1000);
        }
    }

answersblock.addEventListener('click' , function(e){
    clickedanswerid = e.target.id;
    console.log('User answer id' + clickedanswerid);
    console.log(e.target.className);
    checkanswer(e.target);
    clickedanswerid = '';
});


actionbutton.onclick = function(){
    isrunning = true;
    timeleft = timeforanswer;
    htmlquestion.style.display = 'block';
    run();
};

