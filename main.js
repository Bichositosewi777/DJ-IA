song="";
function preload()
{
    song=loadSound("the search nf.mp3");
}
function setup()
{
    canvas=createCanvas(600, 500);
    canvas.center();
    camara=createCapture(VIDEO);
    camara.hide();
}
function draw()
{
    image(camara, 0, 0, 600, 500);
}
function play()
{
    song.play();
}