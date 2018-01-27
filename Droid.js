const DROID_RADIUS = 21;

class Droid extends movingObject {
    constructor(game, pos) {
        super(game, pos, ZERO_RADIUS);

        // We assume we have this asset:
        var img = ASSET_MANAGER.getAsset("./Characters/zeroAndDroid.png");
        this.fall = new Animation(img, 0, 401, 50, 50, FRAME_TIME, 3, true, false);
        this.aim = new Animation(img, 151, 401, 50, 50, FRAME_TIME, 6, false, false);
        this.point = new Animation(img, 401, 401, 50, 50, FRAME_TIME, 1, true, false);
        this.die = new Animation(img, 151, 451, 50, 50, FRAME_TIME, 5, false, false);
        this.dead = new Animation(img, 351, 451, 50, 50, FRAME_TIME, 1, true, false);

        img = ASSET_MANAGER.getAsset("./Characters/SFX.png");
        this.explosionAnim = new Animation(img, 0, 0, 50, 50, FRAME_TIME / 2, 7, false, false);
        this.explosionAnim2 = new Animation(img, 0, 0, 50, 50, FRAME_TIME / 2, 7, false, false);

        this.positionOffset = 25;

        this.time = 0;
        this.currentAnimation = this.fall;

        this.xVel = -50;

        this.gravity = 100;
        this.flag = false;
        this.flag2 = false;
        this.flag3 = false;
    }

    update() {
        super.update();

        // State machine ahoy:
        if (this.time > 5.1) {
            this.destroy();
        } else if (this.time > 5 && !this.flag3) {
            new SFX(this.game, {x: this.x-25, y: this.y-10}, this.explosionAnim2);
            this.flag3 = true;
        } else if (this.time > 4 && !this.flag2) {
            this.currentAnimation = this.die;
            new SFX(this.game, {x: this.x-25, y: this.y-20}, this.explosionAnim);
            this.flag2 = true;
        } else if (this.yVel == 0 && !this.flag) {
            this.currentAnimation = this.aim;
            this.xVel = 0;
            this.flag = true;
        }

        this.time += this.game.clockTick;

        if (this.currentAnimation && this.currentAnimation.isDone()) {
            if (this.currentAnimation == this.aim) {
                this.currentAnimation = this.point;
            } else if (this.currentAnimation == this.die) {
                this.currentAnimation = this.dead;
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
