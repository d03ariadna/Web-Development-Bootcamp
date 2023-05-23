var img1 = refresh();
var diceImg1 = "images/dice" + img1 + ".png";

var img2 = refresh();
var diceImg2 = "images/dice" + img2 + ".png";
document.querySelectorAll("img")[0].setAttribute("src", diceImg1);
document.querySelectorAll("img")[1].setAttribute("src", diceImg2);

//alert("Done");

if (img1 > img2){
    document.querySelector("h1").innerHTML = "Player 1 wins!";
}else if (img2 > img1){
    document.querySelector("h1").innerHTML = "Player 2 wins!";
}else{
    document.querySelector("h1").innerHTML = "Draw!";
}

function refresh(){
    var img = (Math.random() * 6);
    img = Math.floor(img) + 1;
    return img;
}