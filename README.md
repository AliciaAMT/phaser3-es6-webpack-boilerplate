# HTML5 Game Dev: 2D Platform Fundamentals Tutorial

## Tools
Phaser.io
NVM
VsCode
`git clone https://github.com/jedhastwell/phaser3-es6-webpack-boilerplate.git`
Optional: Texture Packer


## Install Dependencies
`npm ci`

## Run Server
`npm run start`

## Phaser Library Documents
This version:

https://photonstorm.github.io/phaser3-docs/

## Assets Sources
https://itch.io
https://opengameart.org
This one:
https://finalbossblues.itch.io/pixel-platformer-pack

### Notes on Sprites
Texture Atlas - combines all textures and has a key file to translate positions
(json file)

### Loading Sprite Sheet
Game.js
#### Preload funcion:
`this.load.spritesheet('hero-run-sheet', 'assets/hero/run.png', { frameWidth: 32, frameHeight: 64, });`

#### create function:
`this.add.sprite(400,300, 'hero-run-sheet', 5);`

### Load Animation
(create function)
`this.anims.create({ key: 'hero-running', frames: this.anims.generateFrameNumbers('hero-run-sheet'), frameRate: 10, repeat: -1, });`

### Add Physics
(config.js)
`,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 750},
    },    
  }`

(create in game.js)
Add physics engine to this line:
`this.player = this.physics.add.sprite(400, 300, 'hero-run-sheet');`

#### Prevent Player From Falling Out of Bounds
(create game.js)
` this.player.body.setCollideWorldBounds(true);`

#### Debugging
`debug: true,
      debugShowVelocity: true,
      debugShowBody: true,
      debugShowStaticBody: true,`

#### Fix Collision Body
(size and offset)

### Refactor Hero Data to Entities

## Class 14 - Capturing Keyboard Input

### Install State Machine Library
`npm install javascript-state-machine --save`














# Phaser 3 + ES6 + Webpack Boilerplate
A boilerplate project for creating games with Phaser3, ES6 and Webpack.

## Setup

### Environment
Requires node.js and npm to be installed: https://nodejs.org/en/

### Download repo
From your workspace directory run:

`git clone https://github.com/jedhastwell/phaser3-es6-webpack-boilerplate.git`

### Install Dependencies
From the project directory run:

`npm install`

## Usage

### Development Server
Starts a development server that will automatically refresh the page as you make changes. Once started, navigate to http://localhost:8080 in your browser.

To start the server run:

`npm run start`

### Distribution
Bundles and minimises scripts and outputs them along with a copy of the assets/ folder to output directory dist/.

To build for distribution run:

`npm run build`