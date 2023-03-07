var imgs = [];
var avgImg;
var numOfImages = 30;
var randomI;
var prevI;

//////////////////////////////////////////////////////////
function preload()
{
    // preload() runs once
    for(var i = 0; i < numOfImages; i++)
    {
        var img = loadImage("assets/" + i + ".jpg");
        imgs.push(img);
    }

    randomI = round(random(0, 29));
    prevI = randomI;


}
//////////////////////////////////////////////////////////
function setup()
{
    createCanvas(imgs[0].width * 2, imgs[0].height);
    pixelDensity(1);

    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw()
{
    background(125);
    image(imgs[randomI], 0, 0);

    for(var i = 0; i < imgs.length; i++)
    {
        imgs[i].loadPixels();
    }

    avgImg.loadPixels();

    for(var y = 0; y < imgs[0].height; y++)
    {
        for(var x = 0; x < imgs[0].width; x++)
        {
            var pixelIndex = ((imgs[0].width * y) + x) * 4;
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;

            for(var i = 0; i < imgs.length; i++)
            {
                sumR += imgs[i].pixels[pixelIndex + 0];
                sumG += imgs[i].pixels[pixelIndex + 1];
                sumB += imgs[i].pixels[pixelIndex + 2];
            }

            avgImg.pixels[pixelIndex + 0] = sumR / imgs.length;
            avgImg.pixels[pixelIndex + 1] = sumG / imgs.length;
            avgImg.pixels[pixelIndex + 2] = sumB / imgs.length;
            avgImg.pixels[pixelIndex + 3] = 255;
        }
    }

    avgImg.updatePixels();

    image(avgImg, imgs[0].width, 0);

    noLoop();
}

function keyPressed()
{
    while(randomI == prevI)
    {
        randomI = round(random(0, 29));
    }

    image(imgs[randomI], 0, 0);
    prevI = randomI;
}
