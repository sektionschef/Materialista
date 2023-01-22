class Brush {
    constructor(data) {

        this.noiseColor = getRandomFromList(data.noiseColor);
        this.fillColor = color("white"); // dummy 

        this.size = data.size;
        // this.strokeSize = data.strokeSize;
        // this.fillColor = data.fillColor;
        // this.strokeColor = data.strokeColor;
        // this.strokeColor = color("black");//color(randomGaussian(30, 10));
        this.curveSexyness = data.curveSexyness;
        // this.curveSexyness = getRandomFromInterval(1, 5);
        this.pixelDistort = data.pixelDistort;
        this.opacityDistort = data.opacityDistort;

        this.buffer = createGraphics(this.size, this.size);

        this.center = createVector(this.buffer.width / 2, this.buffer.height / 2);
        this.maxDist = Math.sqrt(this.buffer.width ** 2 + this.buffer.height ** 2);

        let q1X = getRandomFromInterval(0, this.buffer.width / 2);
        let q1Y = getRandomFromInterval(0, this.buffer.height / 2);
        let q2X = getRandomFromInterval(this.buffer.width / 2, this.buffer.width);
        let q2Y = getRandomFromInterval(0, this.buffer.height / 2);
        let q3X = getRandomFromInterval(0, this.buffer.width / 2);
        let q3Y = getRandomFromInterval(this.buffer.height / 2, this.buffer.height);
        let q4X = getRandomFromInterval(this.buffer.width / 2, this.buffer.width);
        let q4Y = getRandomFromInterval(this.buffer.height / 2, this.buffer.height);

        // this.buffer.noStroke();
        // this.buffer.fill(color(PALETTE.pixelColors[2]));
        // this.buffer.stroke(color(PALETTE.pixelColors[1]));
        // this.buffer.strokeWeight(3);
        // this.buffer.beginShape();
        // this.buffer.vertex(10, 10);
        // this.buffer.vertex(90, 10);
        // this.buffer.vertex(60, 60);
        // this.buffer.vertex(10, 40);
        // this.buffer.endShape(CLOSE);

        // CURVES
        this.buffer.push();
        this.buffer.curveTightness(this.curveSexyness);
        this.buffer.fill(this.fillColor);
        // this.buffer.stroke(this.strokeColor);
        // this.buffer.strokeWeight(this.strokeSize);
        this.buffer.noStroke();
        this.buffer.beginShape();
        this.buffer.curveVertex(q1X, q1Y);
        this.buffer.curveVertex(q1X, q1Y);
        this.buffer.curveVertex(q2X, q2Y);
        this.buffer.curveVertex(q4X, q4Y);
        this.buffer.curveVertex(q3X, q3Y);
        this.buffer.curveVertex(q3X, q3Y);
        this.buffer.endShape(CLOSE);
        this.buffer.pop();

        // LINES
        // this.buffer.fill(this.fillColor);
        // this.buffer.stroke(this.strokeColor);
        // this.buffer.strokeWeight(this.strokeSize);
        // this.buffer.beginShape();
        // this.buffer.vertex(q1X, q1Y);
        // this.buffer.vertex(q1X, q1Y);
        // this.buffer.vertex(q2X, q2Y);
        // this.buffer.vertex(q4X, q4Y);
        // this.buffer.vertex(q3X, q3Y);
        // this.buffer.vertex(q3X, q3Y);
        // this.buffer.endShape(CLOSE);

        this.buffer.loadPixels();
        let x, y, index;
        // let inc = 0.005;
        let inc = 0.1;

        let xoff = 0;
        for (x = 0; x < this.buffer.width; x++) {
            let yoff = 0;
            for (y = 0; y < this.buffer.height; y++) {
                index = (x + y * this.buffer.width) * 4;


                // var offset = getRandomFromInterval(-this.pixelDistort, this.pixelDistort)

                // if (this.buffer.pixels[index + 3] != 0) {
                //     this.buffer.pixels[index + 0] += offset;
                //     this.buffer.pixels[index + 1] += offset;
                //     this.buffer.pixels[index + 2] += offset;
                //     this.buffer.pixels[index + 3] = this.buffer.pixels[index + 3];
                // }


                // GRADIENT
                // let inter = map(x, 0, this.buffer.width, 0, 1);
                // let c = lerpColor(color("#353535"), color("#dddddd"), inter);

                // if (this.buffer.pixels[index + 3] != 0) {
                //     this.buffer.pixels[index + 0] = red(c);
                //     this.buffer.pixels[index + 1] = green(c);
                //     this.buffer.pixels[index + 2] = blue(c);
                //     this.buffer.pixels[index + 3] = this.buffer.pixels[index + 3];
                // }

                // NOISE
                // var offset = getRandomFromInterval(-this.pixelDistort, this.pixelDistort)
                // var threshold = map(x, 0, this.buffer.width, 0, 1);

                // if (fxrand() > threshold) {
                //     this.buffer.pixels[index + 0] += offset;
                //     this.buffer.pixels[index + 1] += offset;
                //     this.buffer.pixels[index + 2] += offset;
                //     this.buffer.pixels[index + 3] = this.buffer.pixels[index + 3];
                // } else {
                //     this.buffer.pixels[index + 0] = red(this.noiseColor);
                //     this.buffer.pixels[index + 1] = green(this.noiseColor);
                //     this.buffer.pixels[index + 2] = blue(this.noiseColor);
                //     this.buffer.pixels[index + 3] = this.buffer.pixels[index + 3];
                // }

                // ONLY PIXEL - FOR PRODUCTION
                // map x pos to prob. of noise
                var threshold = map(p5.Vector.dist(this.center, createVector(x, y)), 0, this.maxDist, 0, 1);
                var offset = getRandomFromInterval(-this.pixelDistort, this.pixelDistort)
                var opOffset = getRandomFromInterval(-this.opacityDistort, 0)

                if (this.buffer.pixels[index + 3] != 0) {
                    if (fxrand() > threshold) {
                        this.buffer.pixels[index + 0] = 0;
                        this.buffer.pixels[index + 1] = 0;
                        this.buffer.pixels[index + 2] = 0;
                        this.buffer.pixels[index + 3] = 0;
                    } else {
                        this.buffer.pixels[index + 0] = red(this.noiseColor) + offset;
                        this.buffer.pixels[index + 1] = green(this.noiseColor) + offset;
                        this.buffer.pixels[index + 2] = blue(this.noiseColor) + offset;
                        this.buffer.pixels[index + 3] = this.buffer.pixels[index + 3] + opOffset;
                    }
                }

                // ONLY Perlin NOISE
                // let r = noise(xoff, yoff) * 155 + 100;

                // if (this.buffer.pixels[index + 3] != 0) {

                //     this.buffer.pixels[index + 0] = r // red(this.noiseColor) + offset;
                //     this.buffer.pixels[index + 1] = r // green(this.noiseColor) + offset;
                //     this.buffer.pixels[index + 2] = r // blue(this.noiseColor) + offset;
                //     this.buffer.pixels[index + 3] = this.buffer.pixels[index + 3] // this.buffer.pixels[index + 3] + opOffset;
                // }

                // COMIBNE PERLIN NOISE FOR OPACITY AND PIXEL STRUCTURE
                // let r = noise(xoff, yoff) * 155 + 100;
                // var threshold = map(p5.Vector.dist(this.center, createVector(x, y)), 0, this.maxDist, 0, 1);
                // var offset = getRandomFromInterval(-this.pixelDistort, this.pixelDistort)
                // var opOffset = getRandomFromInterval(-this.opacityDistort, 0)

                // if (this.buffer.pixels[index + 3] != 0) {
                //     if (fxrand() > threshold) {
                //         this.buffer.pixels[index + 0] = 0;
                //         this.buffer.pixels[index + 1] = 0;
                //         this.buffer.pixels[index + 2] = 0;
                //         this.buffer.pixels[index + 3] = 0;
                //     } else {
                //         this.buffer.pixels[index + 0] = red(this.noiseColor) + offset;
                //         this.buffer.pixels[index + 1] = green(this.noiseColor) + offset;
                //         this.buffer.pixels[index + 2] = blue(this.noiseColor) + offset;
                //         this.buffer.pixels[index + 3] = r;
                //     }
                // }

                yoff += inc;
            }
            xoff += inc;
        }
        this.buffer.updatePixels();
    }
}

