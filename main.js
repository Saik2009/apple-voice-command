x = 0;
y = 0;
speak_data = "";
draw_apple = "";
to_number = "";
apple = ""
var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;


  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    draw_apple = "set";
    document.getElementById("status").innerHTML = "Drawing Apple";

  } else {
    document.getElementById("status").innerHTML = "The speech ahs not been recognized as a number";
  }
}

function preload() {
  apple = loadImage("apple.png");
}

function setup() {
  createCanvas(window.innerWidth - 150, window.innerHeight - 150);

}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    for(i=1;i<=to_number;i++){
      x= Math.floor(Math.random()*window.innerWidth-150);
      y= Math.floor(Math.random()*window.innerHeight-150);
      image(apple,x,y,50,50);
    }
  }
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = to_number + "Apples Drawn";

  speak();
}