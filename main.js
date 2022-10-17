img = "";
status = "";
objects = [];

function preload(){
   img = loadImage("");
}
function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(600,600);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}
function draw(){
    image(video, 0, 0, 600, 600);

    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        for(x = 0;x < objects.length; x++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "No of Objects detected are : "+objects.length;
            fill(r,g,b);
            noFill();
            percent = floor(objects[x].confidence*100);
            text(objects[x].label + " " +percent+ "%", objects[x].x, objects[x].y);
            stroke(r,g,b);
            rect(objects[x].x, objects[x].y, objects[x].width, objects[x].height);
        }
    }
}
function modelloaded(){
    console.log("model is loaded");
    status = true;
    objectDetector.detect(video, gotresults);
}
function gotresults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);

    objects = results;

}