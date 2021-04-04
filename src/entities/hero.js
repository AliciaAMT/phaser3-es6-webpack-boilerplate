import Phaser from 'phaser';
import StateMachine from 'javascript-state-machine';

class Hero extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'hero-run-sheet', 0);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // this.add.image(400, 300, 'logo');
        //this.player = this.physics.add.sprite(250, 160, 'hero-run-sheet');
        this.anims.play('hero-running');
        // do not allow player to fall out of bounds
        this.body.setCollideWorldBounds(true);
        this.body.setSize(12, 40);
        this.body.setOffset(12,23);

        this.body.setMaxVelocity(250, 400);
        this.body.setDragX(750);

        this.keys = scene.cursorKeys;

        this.setupMovement();
    }

    setupMovement() {
        this.moveState = new StateMachine({
            init: 'standing',
            transistions: [
                { name: 'jump', from: 'standing', to: 'jumping' },
                { name: 'flip', from: 'jumping', to: 'flipping' },
                { name: 'fall', from: 'standing', to: 'falling' },
                { name: 'touchdown', from: ['jumping', 'flipping', 'faliing'], to: 'standing' },
            ],
            methods: {
                onJump: () => {
                    this.body.setVelocityY(-400);
                },
                onFlip: () => {
                    this.body.setVelocityY(-300);
                }
            }
        });

        this.movePredicates = {
            jump: () => {},
            flip: () => {},
            fall: () => {},
            touchdown: () => {},
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        if (this.keys.left.isDown) {
            this.body.setAccelerationX(-1000);
            this.setFlipX(true);
            this.body.offset.x = 8;
        } else if (this.keys.right.isDown) {
            this.body.setAccelerationX(1000);
            this.setFlipX(false);
            this.body.offset.x = 12;
        } else {
            this.body.setAccelerationX(0);
        }
/* **********OPTIONAL CHANGE JUMP TO REPRESS UP KEY EVERY TIME OR IT WON"T BOUNCE***********
                Replce line: if(didPressJump && this.body.onFloor()) {
                With: if(this.keys.up.isDown && this.body.onFloor()) {
                and remove variable(const) to revert back to holding down up button to bounce
                Think about allowing bounce to rev up a higher jump...

*/
                    // set to true if you want to double jump out of falls or knockback
        if (this.body.onFloor()) {
            this.canDoubleJump = false;
        }

        if (this.body.velocity.y > 0) {
            this.isJumping = false;
        }

        const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);
//create double jump shoes named after simone biles the "goat" shoes
        // if (didPressJump && this.body.onFloor()) {
        //     this.body.setVelocityY(-400);
        // }
        
        if (didPressJump) {
            if (this.body.onFloor()) {
                this.isJumping = true;
                this.canDoubleJump = true;
                this.body.setVelocityY(-400);
            } else if (this.canDoubleJump) {
                this.isJumping = true;
                this.canDoubleJump = false;
                this.body.setVelocityY(-300);
            }
        }

        if (!this.keys.up.isDown && this.body.velocity.y < -150 && this.isJumping) {
            this.body.setVelocityY(-150);
        }
        
        for (const t of this.moveState.transistions()) {
            if (t in this.movePredicates && this.movePredicates[t]()) {
                this.moveState[t]();
                break;
            }
        }
    }
}
export default Hero;