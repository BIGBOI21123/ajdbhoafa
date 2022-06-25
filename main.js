Hasong = "";
LeftWristX = 0;
LeftWristY = 0;
RightWristX = 0;
RightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
NoseX = 0;
NoseY = 0;
debounce = nil;

function preload()
{
    Hasong = loadSound("music.mp3");
    Pesong = loadSound("peter.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = " + LeftWristX + "Left Wrist Y = " + LeftWristY);
        console.log("Right Wrist X = " + RightWristX + "Right Wrist Y = " + RightWristY);
    }
}

function modelLoaded() {
    console.log("Posenet is running");
}

function draw() {
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("green");
    
    if (scorerightwrist > 0.2) {
        circle(RightWristX-30, RightWristY, 20);
        if(RightWristY > 0 && RightWristY <= 100) {
            document.getElementById("speedtext").innerHTML = "Speed: 0.5x";
            Hasong.rate(0.5);
        }
        else if(RightWristY > 100 && RightWristY <= 200) {
            document.getElementById("speedtext").innerHTML = "Speed: 1x";
            Hasong.rate(1);
        }
        else if(RightWristY > 200 && RightWristY <= 300) {
            document.getElementById("speedtext").innerHTML = "Speed: 1.5x";
            Hasong.rate(1.5);
        }
        else if(RightWristY > 300 && RightWristY <= 400) {
            document.getElementById("speedtext").innerHTML = "Speed: 2x";
            Hasong.rate(2);
        }
        else if(RightWristY > 400 && RightWristY <= 500) {
            document.getElementById("speedtext").innerHTML = "Speed: 2.5x";
            Hasong.rate(2.5);
        }
    }

    if (scoreleftwrist > 0.2) {
        circle(LeftWristX-100, LeftWristY, 20);
        leftY = Number(LeftWristY);
        varible = Math.floor(leftY);
        volume = varible/500;
        Hasong.setVolume(volume);
        document.getElementById("volumetext").innerHTML = "Volume - "+volume;
    }

    if (NoseX > 0.2) {
        circle(NoseX-70, NoseY+10, 20)

        if (NoseY > 200) {
            Pesong.stop();
            debounce = Hasong.isPlaying();
            if (debounce == false) {
                Hasong.play();
            }
            else{
                document.getElementById("songHere").innerHTML = "Harry Potter Remix";
            }
        }
        if (NoseY < 200) {
            Hasong.stop();
            debounce = Pesong.isPlaying();
            if (debounce == false) {
                Pesong.play();
            }
            else{
                document.getElementById("songHere").innerHTML = "Peter Pan";
            }
        }
    }
}

function Play() {
    Hasong.play();
    Hasong.setVolume(1);
    Hasong.rate(1);
}

function Pause() {
    Hasong.stop();
    Pesong.stop();
}