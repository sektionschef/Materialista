// grasp maxforce;

class Brushstroke extends Vehicle {
    constructor(origin, target, sprite) {

        super(origin, target);

        this.maxSpeed = 15;  // top speed limit
        this.minSpeed = 2;  // minimum speed - prevents from stopping at 0
        this.maxForce = 2;  // agility for changes, if too little -> overshoot
        this.slowRadius = 500;  // radius in which to slow down
        this.targetBdist = getRandomFromList([50, 100, 200, 250, 300]);

        this.origin = origin;
        this.totalDistance = p5.Vector.sub(target, this.origin);
        this.targetBAngle = this.totalDistance.heading() + PI / 2; // or - PI/2
        this.targetB = p5.Vector.add(target, p5.Vector.fromAngle(this.targetBAngle, this.targetBdist));
        // this.target = new Vehicle(target, p5.Vector.add(target, p5.Vector.random2D().mult(400)));
        this.target = new Vehicle(target, this.targetB);
        this.turningDistance = this.totalDistance.mag() / 2;  // where the target shiftsback to origin - e.g. half of the distance

        this.DEBUG = false;
        // for dynamic resizing
        this.basicSizeMin = 50;
        this.basicSizeMax = 100;
        this.basicSize = this.basicSizeMax;

        this.desiredSpeed = 0;  // initial value, dynamic actual speed

        this.sprite = sprite;

        this.switchTarget = false;
    }

    seekBrushstrokeTarget() {

    }

    updateTarget() {
        this.target.show();
        this.target.applyForce(this.target.seek());
    }


    updateBrushstroke() {
        this.update();
        this.updateTarget();

        if (this.distanceToTarget < this.turningDistance && this.switchTarget == false) {

            this.target.revertToOrigin();
            this.switchTarget = true;
        }

        this.basicSize = Math.round(map(this.desiredSpeed, 0, this.maxSpeed, this.basicSizeMax, this.basicSizeMin));
    }

    showBrushstroke() {

        this.updateBrushstroke();

        if (this.DEBUG) {
            this.show();
        }

        push();
        translate(this.pos.x, this.pos.y);
        noStroke();
        rotate(this.vel.heading())
        imageMode(CENTER);
        // image
        // this.sprite.resize(0, this.basicSize);
        // image(this.sprite, 0, 0);
        // buffer
        image(this.sprite, 0, 0, 0, this.basicSize);
        pop();

    }

}