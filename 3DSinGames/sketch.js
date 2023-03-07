var confLocs;
var confTheta;

function setup()
{
    createCanvas(900, 800, WEBGL);
    camera(800, -600, 800, 0, 0, 0, 0, 1, 0);

    confLocs = [];
    confTheta = [];

    for(var i = 0; i < 200; i++)
    {
        var cX = random(-500, 500);
        var cY = random(-800, 0);
        var cZ = random(-500, 500);
        var cV = createVector(cX, cY, cZ);
        var cA = random(0, 360);

        confLocs.push(cV);
        confTheta.push(cA);
    }

}

function draw()
{
    background(125);
    angleMode(DEGREES);

    var xLoc = cos(frameCount) * height;
    var zLoc = sin(frameCount) * height;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

    normalMaterial();
    stroke(0);
    strokeWeight(3);

    for(var x = -400; x <= 400; x+= 50)
    {
        for(var z = -400; z <= 400; z+= 50)
        {
            push();
            translate(x, 0, z);
            var distance = dist(0, 0, x, z) + frameCount;
            var length = map(sin(distance), -1, 1, 100, 300);
            box(50, length, 50);

            pop();
        }
    }

    confetti();
}

function confetti()
{
    for(var i = 0; i < confLocs.length; i++)
    {
        push();
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        plane(15,15);

        confLocs[i].y += 1;
        confTheta[i] += 10;

        if(confLocs[i].y > 0)
        {
            confLocs[i].y = -800;
        }

        pop();
    }
}
