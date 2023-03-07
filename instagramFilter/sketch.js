// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload()
{
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup()
{
    createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw()
{
    background(125);
    image(imgIn, 0, 0);
    image(earlyBirdFilter(imgIn), imgIn.width, 0);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed()
{
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img)
{
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn, resultImg);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg);
  return resultImg;
}

function sepiaFilter(img, resultimg)
{
    img.loadPixels();
    resultimg.loadPixels();

    for(var y = 0; y < img.height; y++)
    {
        for(var x = 0; x < img.width; x++)
        {
            var pixelIndex = ((img.width * y) + x) * 4;

            var oldRed = img.pixels[pixelIndex + 0];
            var oldGreen = img.pixels[pixelIndex + 1];
            var oldBlue = img.pixels[pixelIndex + 2];

            var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189);
            var newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168);
            var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131);

            resultimg.pixels[pixelIndex + 0] = newRed;
            resultimg.pixels[pixelIndex + 1] = newGreen;
            resultimg.pixels[pixelIndex + 2] = newBlue;
            resultimg.pixels[pixelIndex + 3] = 255;
        }
    }
    resultimg.updatePixels();
    return resultimg;
}

function darkCorners(img)
{
    for(var y = 0; y < img.height; y++)
    {
        for(var x = 0; x < img.width; x++)
        {
            var pixelIndex = ((img.width * y) + x) * 4;
            var dynLum = 0;
            var d = abs(dist(x, y, img.width / 2, img.height / 2));
            if(d >= 300 && d <= 450)
            {
                dynLum = constrain(map(d, 300, 450, 1, 0.4), 0.4, 1);
            }
            else if(d > 450)
            {
                dynLum = constrain(map(d, 450, 480, 0.4, 0), 0, 0.4);
            }
            else
            {
                dynLum = 1;
            }

            img.pixels[pixelIndex + 0] *= dynLum;
            img.pixels[pixelIndex + 1] *= dynLum;
            img.pixels[pixelIndex + 2] *= dynLum;

        }
    }

    img.updatePixels();
    return img;
}

function convolution(x, y, matrix, matrixSize, img)
{
    var totalR = 0.0;
    var totalG = 0.0;
    var totalB = 0.0;

    var offset = floor(matrixSize / 2);

    for(var i = 0; i < matrixSize; i++)
    {
        for(var j = 0; j < matrixSize; j++)
        {
            var xLoc = x + i - offset;
            var yLoc = y + i - offset;

            var index = (img.width * yLoc + xLoc) * 4;
            index = constrain(index, 0, img.pixels.length - 1);

            totalR += img.pixels[index + 0] * matrix[i][j];
            totalG += img.pixels[index + 1] * matrix[i][j];
            totalB += img.pixels[index + 2] * matrix[i][j];
        }
    }

    return [totalR, totalG, totalB];
}

function radialBlurFilter(img)
{
    img.loadPixels();
    var matrixSize = matrix.length;

    for(var y = 0; y < img.height; y++)
    {
        for(var x = 0; x < img.width; x++)
        {
            var pixelIndex = ((img.width * y) + x) * 4;
            var oldRed = img.pixels[pixelIndex + 0];
            var oldGreen = img.pixels[pixelIndex + 1];
            var oldBlue = img.pixels[pixelIndex + 2];
            var d = abs(dist(x, y, mouseX, mouseY));
            var dynBlur = map(d, 100, 300, 0, 1);

            dynBlur = constrain(dynBlur, 0, 1);

            var c = convolution(x, y, matrix, matrixSize, img);

            img.pixels[pixelIndex + 0] = c[0] * dynBlur + oldRed * (1 - dynBlur);
            img.pixels[pixelIndex + 1] = c[1] * dynBlur + oldGreen * (1 - dynBlur);
            img.pixels[pixelIndex + 2] = c[2] * dynBlur + oldBlue * (1 - dynBlur);

        }
    }
    img.updatePixels();
    return img;
}

function borderFilter(img)
{
    var buffer = createGraphics(img.width, img.height);
    buffer.image(img, 0, 0);

    buffer.noFill();
    buffer.stroke(255);
    buffer.strokeWeight(20);
    buffer.rect(0,0,img.width, img.height,50);

    buffer.rect(0, 0, img.width, img.height);

    return buffer;
}
