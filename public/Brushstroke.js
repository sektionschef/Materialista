// grasp maxforce;

class Brushstroke extends Vehicle {
    constructor(origin, target, sprite) {

        // adds a sprite and a moving target on top of vehicle class
        super(origin, target);

        this.maxSpeed = 15;  // top speed limit
        this.minSpeed = 2;  // minimum speed - prevents from stopping at 0
        this.maxForce = 2;  // agility for changes, if too little -> overshoot
        this.slowRadius = 200;  // radius in which to slow down
        this.targetBdist = 400 // getRandomFromList([50, 100, 200]);  // distance between target and target B - offset of target - 
        this.targetBDirection = getRandomFromList([1, -1]);  // add 90 or 270 degrees to the target for finding target B
        this.DEBUG = true;

        this.origin = origin;
        this.totalDistance = p5.Vector.sub(target, this.origin);
        this.targetBAngle = this.totalDistance.heading() + PI / 2 * this.targetBDirection; // or - PI/2
        this.targetB = p5.Vector.add(target, p5.Vector.fromAngle(this.targetBAngle, this.targetBdist));
        this.target = new Vehicle(target, this.targetB, this.DEBUG);
        this.turningDistance = this.totalDistance.mag() / 2;  // where the target shiftsback to origin - e.g. half of the distance

        // for dynamic resizing
        this.basicSizeMin = 50;
        this.basicSizeMax = 100;
        this.basicSize = this.basicSizeMax;

        this.desiredSpeed = 0;  // initial value, dynamic actual speed

        this.sprite = sprite;

        this.switchTarget = false;
    }

    updateTarget() {
        // move to targetB
        this.target.show();
        this.target.update();
        this.target.applyForce(this.target.seek());
    }

    updateBrushstroke() {
        this.update();
        this.updateTarget();

        if (this.distanceToTarget > this.turningDistance && this.switchTarget == false) {
            this.target.target = this.target.origin.copy();
            this.switchTarget = true;
        }

        // dynamic size for speed
        this.basicSize = Math.round(map(this.desiredSpeed, 0, this.maxSpeed, this.basicSizeMax, this.basicSizeMin));
    }

    showBrushstroke() {
        if (this.DEBUG) {
            // origin DEBUG        
            push();
            translate(this.origin.x, this.origin.y);
            fill(color("orange"));
            noStroke();
            circle(0, 0, 50);
            pop();

            // target slowRadius
            push();
            translate(this.origin.x, this.origin.y);
            strokeWeight(5);
            stroke(color("orange"));
            noFill();
            circle(0, 0, this.slowRadius * 2);
            pop();
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