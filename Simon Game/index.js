
var sequence = [];
const colors = ["purple", "blue","gray", "pink"];
var colorC;
var audio;
var level = 0;
var p;

var seqUser = [];



$(document).keypress(function(){
    if(level == 0){
        setTimeout(() =>nextSequence(), 300);
    }
});


$(".btn").click(function(){
    doEffect($(this).attr("id"));
    $(this).addClass("pressed");
    setTimeout(() => ($(".btn").removeClass("pressed")), 200);

    seqUser.push($(this).attr("id"));
    console.log("clicked "+p)
    checkAnswer();
})




function nextSequence(){

    level += 1;

    $(".title").text("Level "+level);

    var n;
    n = Math.floor(Math.random()*4);
    sequence.push(colors[n]);

    //Make effect
    doEffect(colors[n]);
    $("#"+colors[n]).fadeOut(100).fadeIn(100);

    p = 0;
    seqUser = [];
}

function doEffect(button){
    audio = new Audio("sounds/"+button+".mp3");
    audio.play();
}

function checkAnswer(){

    if(sequence[p] == seqUser[p]){
        if(p == (sequence.length-1)){
            setTimeout(() =>nextSequence(), 1000);
        }
        p += 1;

    }else{
        audio = new Audio("sounds/wrong.mp3");
        setTimeout(() => ($("body").addClass("game-over")), audio.play(), 100);
        $(".title").text("Game Over");
        setTimeout(() => ($("body").removeClass("game-over"), 
        $(".title").text("Press a key to restart the game")), 800);
        level = 0;
        sequence = [];
    }
}







