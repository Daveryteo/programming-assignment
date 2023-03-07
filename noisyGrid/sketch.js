var stepSize = 20;
var green;
var blue;
var black;
var red;

function setup()
{
  createCanvas(500, 500);
  green = color(0, 255, 0);
  blue = color(0, 0, 255);
  black = color(0, 0, 0);
  red = color(255, 0, 0);
  angleMode(DEGREES);
}
///////////////////////////////////////////////////////////////////////
function draw()
{
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid()
{
  // your code here
  for(var i = 0; i < 25; i++)
  {
    for(var j = 0; j <  25; j++)
    {
      var factor = map(mouseX, 0, width, 0, 1);
      var x = 0 + j * stepSize;
      var y = 0 + i * stepSize;
      var tx = (x  + frameCount * factor)* 0.01;
      var ty = (y + frameCount * factor)* 0.01;
      var n = noise(tx, ty);
      var c = lerpColor(blue, green, n);
      fill(c);
      noStroke();
      rect(x, y, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid()
{
  // your code here
  for(var i = 0; i < 25; i++)
  {
    for(var j = 0; j < 25; j++)
    {
      push();
      var factor = map(mouseX, 0, width, 0, 1);
      var x = stepSize/2 + j * stepSize;
      var y = stepSize/2 + i * stepSize;
      translate(x, y);
      var tx = (x + 20 + frameCount * factor) * 0.01;
      var ty = (y + 20 + frameCount * factor) * 0.01;
      var n = noise(tx, ty, frameCount * 0.01);
      var angle = map(n, 0, 1, 0, 720)
      var compassLength = map(n, 0, 1, stepSize / 8, stepSize / 2);
      var c = lerpColor(black, red, n);
      rotate(angle);
      stroke(c);
      line(0, 0, 0, -compassLength);
      pop();
    }
  }
}
