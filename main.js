song = ""
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristScore = 0;
leftWristScore = 0;
function preload() {
  song = loadSound("music.mp3")
}
function setup() {
  canvas = createCanvas(500, 500)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  video.size(500, 500)
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on("pose", getPoses)
}
function draw() {
  image(video, 0, 0, 500, 500)
  fill("#f70000")
  stroke("#f70000")

  if (leftWristScore > 0.2) {
    circle(leftWristX, leftWristY, 20)
    leftWristY_number = Number(leftWristY)
    leftWristY_number_decimals = floor(leftWristY_number)
    volume = leftWristY_number_decimals/500
    song.setVolume(volume)
    document.getElementById("volume").innerHTML = "volume:" +volume
  }

  if (rightWristScore > 0.2) {
    circle(rightWristX, rightWristY, 20)
    if (rightWristY > 0 && rightWristY <= 100) {
        song.rate(0.5)
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
      }
    
      if (rightWristY > 100 && rightWristY <= 200) {
        song.rate(1)
        document.getElementById("speed").innerHTML = "Speed = 1.0x"
      }
    
      if (rightWristY > 200 && rightWristY <= 300) {
        song.rate(1.5)
        document.getElementById("speed").innerHTML = "Speed = 1.5x"
      }
    
      if (rightWristY > 300 && rightWristY <= 400) {
        song.rate(2)
        document.getElementById("speed").innerHTML = "Speed = 2.0x"
      }
    
      if (rightWristY > 400 && rightWristY <= 500) {
        song.rate(2.5)
        document.getElementById("speed").innerHTML = "Speed = 2.5x"
      }
  }
}
function modelLoaded() {
  console.log("model is loaded")
}
function getPoses(results) {
  console.log(results)
  leftWristX = results[0].pose.leftWrist.x
  console.log("leftWristX = "+leftWristX)
  rightWristX = results[0].pose.rightWrist.x
  console.log("rightwristX = "+rightWristX)
  leftWristY = results[0].pose.leftWrist.y
  console.log("leftWristY = "+leftWristY)
  rightWristY = results[0].pose.rightWrist.y
  console.log("rightWristY = "+rightWristY)
  leftWristScore = results[0].pose.keypoints[9].score
  rightWristScore = results[0].pose.keypoints[10].score
}
function play() {
  song.play()
  song.setVolume(1)
  song.rate(1)
}
function stop() {
  song.stop()
}