

let music = true;
let gameStarted = false;



let mainAudio = new Audio('assets/main-theme.wav');
mainAudio.volume = 0.2;
mainAudio.loop = true;

let winSound = new Audio('assets/win.wav');
winSound.volume = 0.2;
winSound.loop = true;

// if(music)
// $("#mute").html("<i class='fas fa-volume-up'></i>");
// else{
// $("#mute").html("<i class='fas fa-volume-mute'></i>");
// }
function swapIcon(){
    if(music)
        $("#mute").html("Mute Sound");
    else{
        $("#mute").html("Unmute");
    }

}

function playMainTheme(){
    $("#mute").html("Mute Sound");
    if(gameStarted)
        mainAudio.play();
}
function stopMainTheme(){
    $("#mute").html("Unmute");
    if(gameStarted)
    winSound.pause();
    mainAudio.pause();
}
function playWinSound(){
    if(music){
        mainAudio.pause();
        winSound.play();
        }
}


function playCountdown(){
    if(music){
    let audio = new Audio('assets/countdown.wav');
    audio.volume = 0.1;
    audio.play();
    }
}

function playCoinSound(){
    if(music){
    let audio = new Audio('assets/coin.wav');
    audio.play();
    }
}
function playStarSound(){
    if(music){
        let audio = new Audio('assets/success.wav');
        audio.play();
        }
}
function toggleMusic(){
        music ? stopMainTheme() : playMainTheme();
    music ^= true;
    document.cookie = (`music=${music}`);
} 
function toggleGameStarted(){
    gameStarted ^= true;
} 