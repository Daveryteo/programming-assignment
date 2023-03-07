////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller()
{
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle:angle});
  World.add(engine.world, propeller);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller()
{
  push();
  // your code here
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird()
{
  var r = random(50, 255);
  var g = random(50, 255);
  var b = random(50, 255);
  var birdStyle = {fillStyle:color(r, g, b), strokeStyle:stroke("black")};
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95, render: birdStyle });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds()
{
  push();
  //your code here
  for(var i = 0; i < birds.length; i++)
  {
    fill(birds[i].render.fillStyle);
    drawVertices(birds[i].vertices);
    if(isOffScreen(birds[i]) == true)
    {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower()
{
  //you code here
  boxes = Composites.stack(600, 100, 3, 6, 0, 0, setupTowerBoxes);
  for(var i = 0; i < boxes.bodies.length; i++)
  {
    var g = random(50, 255);
    var r = random(50, 255);
    var b = random(50, 255);
    boxes.bodies[i].render.fillStyle = color(r, g, b);
  }
  World.add(engine.world, [boxes]);
}

function setupTowerBoxes(x, y)
{
  var boxStyle = {fillStyle:"green", strokeStyle: "black"}
  var towerBox = Bodies.rectangle(x, y, 80, 80, {render: boxStyle});
  return towerBox;
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower()
{
  push();
  //your code here
  for(var i = 0; i < boxes.bodies.length; i++)
  {
    fill(boxes.bodies[i].render.fillStyle);
    stroke(boxes.bodies[i].render.strokeStyle);
    drawVertices(boxes.bodies[i].vertices);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot()
{
  //your code here
  slingshotBird = Bodies.circle(180, 180, 20, {resitution: 0.95, friction: 0, mass: 10});
  var constraint_bird_sling = {pointA: {x: 200, y: 200},
    bodyB: slingshotBird,
    pointB: {x: 0, y: 0},
    stiffness: 0.01,
    damping: 0.0001};
  slingshotConstraint = Constraint.create(constraint_bird_sling);
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
