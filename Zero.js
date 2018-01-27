const ZERO_RADIUS = 21;
const FRAME_TIME = 1 / 15;

class Zero extends movingObject {
    constructor(game, pos) {
        super(game, pos, ZERO_RADIUS);

        // We assume we have this asset:
        var img = ASSET_MANAGER.getAsset("./Characters/zeroAndDroid.png");
        //function Animation(spriteSheet, startX, startY, frameWidth, frameHeight, frameDuration, frames, loop, reverse) {
        this.stand = new Animation(img, 0, 0, 50, 50, FRAME_TIME, 1, true, false);
        this.breathe = new Animation(img, 0, 0, 50, 50, FRAME_TIME, 6, true, false);
        this.run = new Animation(img, 0, 51, 50, 50, FRAME_TIME, 10, true, false);
        this.startDash = new Animation(img, 0, 101, 50, 50, FRAME_TIME, 5, false, false);
        this.dash = new Animation(img, 51, 101, 50, 50, FRAME_TIME, 4, true, false);
        this.endDash = new Animation(img, 251, 101, 50, 50, FRAME_TIME, 2, false, false);
        this.dashSlash = new Animation(img, 0, 201, 100, 100, FRAME_TIME, 8, false, false);
        this.fall = new Animation(img, 301, 151, 50, 50, FRAME_TIME, 4, true, false);

        var img = ASSET_MANAGER.getAsset("./Characters/SFX.png");
        this.bloodAnim = new Animation(img, 0, 101, 50, 50, FRAME_TIME, 5, false, false);

        this.positionOffset = 25;

        this.time = 0;
        this.currentAnimation = this.fall;

        this.xVel = 200;

        this.flags = [];
    }

    update() {
        super.update();

        // State machine ahoy:
        if (this.time > 6) {
            this.xVel = 100;
            this.currentAnimation = this.run;
        } else if (this.time > 2.2 && !this.flags[1]) {
            this.xVel = 200;
            this.currentAnimation = this.startDash;
            this.flags[1] = true;
        } else if (this.time > 2 && !this.flags[1]) {
            this.xVel = 100;
            this.currentAnimation = this.run;
        } else if (this.yVel == 0 && !this.flags[0]) {
            this.currentAnimation = this.stand;
            this.xVel = 0;
            this.flags[0] = true;
        }

        //console.log(this.time);
        this.time += this.game.clockTick;

        //console.log((this.currentAnimation.elapsedTime / this.currentAnimation.totalTime));
        if (this.currentAnimation === this.dashSlash && (this.currentAnimation.elapsedTime / this.currentAnimation.totalTime) * this.currentAnimation.frames >= 2 && !this.flags[2]) {
            console.log("Blood spray.");
            new SFX(this.game, {x: this.x+10, y: this.y-20}, this.bloodAnim);
            this.flags[2] = true;
        }

        if (this.currentAnimation.isDone() == true) {
            if (this.currentAnimation === this.endDash) {
                console.log("End");
                this.currentAnimation = this.stand;
                this.xVel = 0;
            } else if (this.currentAnimation === this.dashSlash) {
                console.log("Slash");
                this.currentAnimation = this.endDash;
                this.positionOffset = 25;
                this.xVel = 100;
            } else if (this.currentAnimation === this.startDash) {
                console.log("Start");
                this.currentAnimation = this.dashSlash;
                this.positionOffset = 50;
            }
        }
    }

    draw(ctx) {
        super.draw(ctx);
        //Animation.prototype.drawFrame = function (tick, ctx, x, y, scaleBy) {
        if (this.currentAnimation) {
            this.currentAnimation.drawFrame(this.game.clockTick, ctx, this.x - this.positionOffset, this.y - this.positionOffset);
        }
    }
}
