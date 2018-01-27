class Wall extends Entity {
    constructor(game, pos, dim, img) {
        super(game, pos, dim);

        this.img = img;

        this.game.addStaticEntity(this);
        this.game.partitioner.addToGrid(this, 0);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x - this.w / 2, this.y - this.h / 2);
    }
}
