var speed;

function setup()
{
    createCanvas(900, 700);
}

function draw()
{
    background(0);
    speed = frameCount;

    //Translate Sun
    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));

    //Sun
    celestialObj(color(255,150,0), 200);
    pop();

    //Translate Earth
    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));
    rotate(radians(speed));
    translate(300,0);
    rotate(radians(speed));

    //Earth
    celestialObj(color(0,0,255), 80);
    pop();

    //Translate Moon
    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));
    rotate(radians(speed));
    translate(300,0);
    rotate(radians(-speed * 2));
    rotate(radians(-speed));
    translate(100, 0);

    //Moon
    celestialObj(color(255,255,255), 30);
    pop();

    //Translate 2nd Moon
    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));
    rotate(radians(speed));
    translate(300,0);
    rotate(radians(-speed * 3));
    rotate(radians(-speed));
    translate(120, 100);

    //2nd Moon
    celestialObj(color(125, 125, 125), 20);
    pop();
}

function celestialObj(c, size)
{
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
