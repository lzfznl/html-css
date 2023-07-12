
// https://editor.p5js.org/codingtrain/sketches/OPYPc4ueq
var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

function setup() {
    createCanvas(600, 600, WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (var x = 0; x < cols; x++) {
        terrain[x] = [];
        for (var y = 0; y < rows; y++) {
        terrain[x][y] = 0; //specify a default value for now
        }
    }
}

function draw() {
    flying -= 0.1;
    // 没有xoff yoff不连续 
    var yoff = flying;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
            // terrain[x][y] = random(80,100)
            //Returns the Perlin noise value at specified coordinates.https://p5js.org/reference/#/p5/noise
            xoff += 0.2;
        }
        yoff += 0.2;
    }


    background(0);
    translate(0, 50);
    rotateX(PI / 3);
    fill(200, 200, 200, 150);
    translate(-w / 2, -h / 2);
    // beginShape(TRIANGLE_STRIP);
    // vertex(30, 75);
    // vertex(40, 20);
    // vertex(50, 75);
    // vertex(60, 20);
    // vertex(70, 75);
    // vertex(80, 20);
    // vertex(90, 75);
    // endShape();
    for (var y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
        vertex(x * scl, y * scl, terrain[x][y]);
        vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape();
    }
}
