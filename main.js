objects=[];
status="";
function setup()
{
canvas=createCanvas(500,400);
canvas.center();
}
video="";
function preload()
{
video=createVideo('video.mp4');
video.hide();
}
 function start()
{
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status : detecting objects";
}
function modelLoaded()
{
console.log("model is loaded !");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}
function gotResults(error,results)
{
if(error)
{
console.log(error);
}
else
{
console.log(results);
objects=results;
}
}

function draw()
{
image(video,0,0,500,400);
if(status !="")
{
objectDetector.detect(video,gotResults);
for(i=0;i<objects.length;i++)
{
document.getElementById("status").innerHTML="status : objects detected";
document.getElementById("number_of_objects").innerHTML="number of objects detected are : "+objects.length;
fill('#ff0000');
percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
noFill();
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
}
}
}