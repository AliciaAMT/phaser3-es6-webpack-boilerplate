import Phaser from 'phaser';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  //init(data) {}

  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create(data) {
    this.anims.create();
    // this.add.image(400, 300, 'logo');
    this.add.sprite(400, 300, 'hero-run-sheet', 5);
  }

  update(time, delta) {}
}

export default Game;