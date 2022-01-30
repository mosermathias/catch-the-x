$(document).ready(function () {
    music = +document.cookie.slice(6);
    swapIcon();
    // showGame();
    checkPowerups()
    checkViewport();
    // gameStart();
    // $("#countdown").hide();
    // $("#phaser-div").show();
    //         initGame();
});

function hideGame(){
    $(".container-main").hide();
    $(".game-over").show();
    if(music){
        playWinSound();
    }
    // $("#winner-name").html(playersArray[0].name + " - " + playersArray[0].score)
    // $("#winner-2").html(playersArray[1].name  + " - " + playersArray[1].score)
    // if(players === 3)
    // $("#winner-3").html(playersArray[2].name  + " - " + playersArray[2].score)
    
    if(players === 3){
    $("#winner-name").html(playersstats[2].name + ": " + playersstats[2].score)
    $("#winner-2").html(playersstats[1].name + ": " + playersstats[1].score)
    $("#winner-3").html(playersstats[0].name + ": " + playersstats[0].score)
    }
    else{
        $("#winner-name").html(playersstats[1].name + ": " + playersstats[1].score)
        $("#winner-1").html(playersstats[0].name + ": " + playersstats[0].score)
    }
}

function showGame() {
    $(".container-main").show();
    $(".container-game-start").hide();
    $("#num-1").html(player_name_1 + ": 0")
    $("#num-2").html(player_name_2 + ": 0")
    if (players == 3) {
        $(".player-3-board").show();
        $("#num-3").show();
        $("#num-3").html(player_name_3 + ": 0")
    }
    gameStart();
}
function gameStart(){
    countDown();
    $("#start-game-btn").hide();

    //Delete following lines
    // $("#countdown").hide();
    // $("#game-div").show();
    // initGame(player_name_1, player_name_2, player_name_3);
    // $("canvas").addClass("canvas-border");
    //     const canvas_width = $("canvas").css("width")
    // const canvas_height = $("canvas").css("height")
    // $(".border-img").css("width", canvas_width)
    // $(".border-img").css("height", canvas_height)
    // //till here


}
window.addEventListener("resize", function(){
    const canvas_width = $("canvas").css("width")
    const canvas_height = $("canvas").css("height")
    $(".border-img").css("width", canvas_width)
    $(".border-img").css("height", canvas_height)
    checkViewport();
  });

  function checkViewport(){
    if(window.matchMedia("(max-width: 991px)").matches){
        $(".body-div").hide();
        $(".alert-box").show();
    } else{
        $(".body-div").show();
        $(".alert-box").hide();
    }
  }

function countDown()
{
    playCountdown();

    var timeleft =2;

    $("#countdown").html(3);
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
    }

    if(timeleft === 0){
        $("#countdown").html("GO");
        const wait = setInterval(function(){
            $("#countdown").hide();
            $("#game-div").show();
            initGame(player_name_1, player_name_2, player_name_3);
            $("canvas").addClass("canvas-border");
            const canvas_width = $("canvas").css("width")
            const canvas_height = $("canvas").css("height")
            $(".border-img").css("width", canvas_width)
            $(".border-img").css("height", canvas_height)
            clearInterval(wait)
            toggleGameStarted();
            if(music){
                playMainTheme();
            }
        }, 1000);
    
    }
    else{
        $("#countdown").html(timeleft);
    }
    timeleft -= 1;
    }, 1000);

}
let player_name_1;
let player_name_2;
let player_name_3;

function player1Add() {
    $("#player-1").css("opacity", "50%");
    $("#player-2").css("opacity", "100%");
    $("#input-player-1").removeClass("hover");
    $("#button-add-player-1").removeClass("button-hover");
    $("#button-add-player-1").attr("disabled", "disabled");
    //
    $("#input-player-2").addClass("hover");
    $("#input-player-1 > input").attr("disabled", "disabled");
    $("#input-player-2 > input").removeAttr("disabled");
    $("#button-add-player-2").addClass("button-hover");
    $("#button-add-player-2").removeAttr("disabled");

    player_name_1 = $("#input-name").val() == "" ? "Player 1" : $("#input-name").val();
    $(".player-1-board > .row > .col > h3").html(player_name_1)
    $("#input-name").val(player_name_1)

    


}

function player2Add() {
    $("#player-2").css("opacity", "50%");
    $("#player-3").css("opacity", "100%");
    $("#input-player-2").removeClass("hover");
    $("#button-add-player-2").removeClass("button-hover");
    $("#button-add-player-2").attr("disabled", "disabled");
    //
    $("#input-player-3").addClass("hover");
    $("#input-player-2 > input").attr("disabled", "disabled");
    $("#input-player-3 > input").removeAttr("disabled");
    $("#button-add-player-3").addClass("button-hover");
    $("#button-add-player-3").removeAttr("disabled");

    $(".button-start").removeAttr("disabled");
    $(".button-start").css("opacity", "100%");
    $(".button-start").addClass("hover");

    player_name_2 = $("#input-name-2").val() == "" ? "Player 2" : $("#input-name-2").val();
    $(".player-2-board > .row > .col > h3").html(player_name_2)
    $("#input-name-2").val(player_name_2)

}
let players = 0;

function player3Add() {
    $("#player-3").css("opacity", "50%");
    $("#input-player-3").removeClass("hover");
    $("#button-add-player-3").removeClass("button-hover");
    $("#button-add-player-3").attr("disabled", "disabled");
    $("#input-player-3 > input").attr("disabled", "disabled");

    player_name_3 = $("#input-name-3").val() == "" ? "Player 3" : $("#input-name-3").val();
    $(".player-3-board > .row > .col > h3").html(player_name_3)
    $("#input-name-3").val(player_name_3)
    players = 3;
}
function checkPowerups(){
    const counter_ids = ["#counter1-p1", "#counter2-p1" , "#counter3-p1" ,"#counter1-p2" ,"#counter2-p2", "#counter3-p2", "#counter1-p3" ,"#counter2-p3", "#counter3-p3"]
    for(let id = 0; id<= counter_ids.length; id++){
        if($(counter_ids[id]).html() == 0 )
        {
            $(counter_ids[id]).parent().hide()
        }
        else{
            $(counter_ids[id]).parent().show()
        }
       //$(counter_ids[id]).html() == 0 ? $(counter_ids[id]).parent().show() : $(counter_ids[id]).parent().hide();
    }
}
let playersstats;
function updateScoreboard(playersArray){

    playersArray.sort(function(a,b){
        return a.score - b.score;
    })
    playersstats = [...playersArray];

    if(players === 3)
    {
        $("#num-3").show();
        $("#num-1").html(playersArray[2].name + ": " + playersArray[2].score)
        $("#num-2").html(playersArray[1].name + ": " + playersArray[1].score)
        $("#num-3").html(playersArray[0].name + ": " + playersArray[0].score)

    }
    else{
        if(playersArray[0].score > playersArray[1].score){
            $("#num-1").html(playersArray[0].name + ": " + playersArray[0].score)
            $("#num-2").html(playersArray[1].name + ": " + playersArray[1].score)
        }
        else{
            $("#num-1").html(playersArray[1].name + ": " + playersArray[1].score)
            $("#num-2").html(playersArray[0].name + ": " + playersArray[0].score)
        }
    }
}