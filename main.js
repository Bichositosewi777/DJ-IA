leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song="";
scorerightWrist=0;
scoreleftWrist=0;
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
    posenet=ml5.poseNet(camara, modelLoaded);
    posenet.on('pose', gotposes);
}
function draw()
{
    image(camara, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftWrist>0.2)
    {
        circle(leftWristX, leftWristY, 20);
        numberleftWristY=Number(leftWristY);
        remove_decimal=floor(numberleftWristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="Volume: "+volume;
        song.setVolume(volume);
    }
    if(scorerightWrist>0.2)
    {
        circle(rightWristX, rightWristY, 20);
        if(rightWristY>0 && rightWristY<=100)
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200)
    {
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300)
    {
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400)
    {
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristY>400)
    {
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
    console.log("posenet is initialized");
}
function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log('leftWristX='+leftWristX+'leftWristY'+leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log('rightWristX='+rightWristX+'rightWristY'+rightWristY);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
    }
}