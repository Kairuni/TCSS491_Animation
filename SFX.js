const SFX_RADIUS = 20;

class SFX extends movingObject {
    constructor(game, pos, animation) {
        super(game, pos, SFX_RADIUS);
        this.anim = animation;
    }

    update() {
        if (this.anim.isDone()) {
            console.log("Destroyed SFX");
            this.destroy();
        }
    }

    draw(ctx) {
        this.anim.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}
