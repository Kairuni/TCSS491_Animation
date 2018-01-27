let RES_Y = 192;
let RES_X = Math.ceil(192 * 1.7777777777777777777);

function Background(game) {
    Entity.call(this, game, 0, 400);
    this.cPos = 0;
}

Background.prototype = new Entity(null, [0,0], [0,0]);
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx) {
    this.cPos -= 100 * this.game.clockTick;
    if (this.cPos <= 0) {
        this.cPos += 256;
    }
    ctx.drawImage(ASSET_MANAGER.getAsset("./Backgrounds/cloudLine.png"), -256 + this.cPos, 0);
    ctx.drawImage(ASSET_MANAGER.getAsset("./Backgrounds/cloudLine.png"), 0 + this.cPos, 0);
    ctx.drawImage(ASSET_MANAGER.getAsset("./Backgrounds/cloudLine.png"), 256 + this.cPos, 0);
}

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Characters/zeroAndDroid.png");
ASSET_MANAGER.queueDownload("./Characters/SFX.png");
ASSET_MANAGER.queueDownload("./Backgrounds/cloudLine.png");
ASSET_MANAGER.queueDownload("./Backgrounds/Snow.png");
ASSET_MANAGER.queueDownload("./Tilesets/groundTiles.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    gameEngine.partitioner = new levelPartitioner({x: 342, y: 192}, 20);

    var bg = new Background(gameEngine, {x: 0, y: 0}, {w: 0, h: 0});
    gameEngine.addStaticEntity(bg);

    var botWall = new Wall(gameEngine, {x: RES_X / 2, y: RES_Y - 16}, {w: RES_X, h: 32}, ASSET_MANAGER.getAsset("./Tilesets/groundTiles.png"));

    var droidChar = new Droid(gameEngine, {x: RES_X, y: -150});
    var zeroChar = new Zero(gameEngine, {x: -50, y: -20})



    gameEngine.showOutlines = false;


    gameEngine.init(ctx);
    gameEngine.start();
});
