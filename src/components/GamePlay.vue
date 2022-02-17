<template>
    <div>
        <div class="floating-top-left">
            <ControlsGuide />
        </div>

        <div class="floating">
            <md-button class="md-raised md-accent md-fab" @click="volume(0)" v-if="isSoundPositive">
                <md-icon>volume_off</md-icon>
            </md-button>
            <md-button class="md-raised md-primary md-fab" @click="volume(0.05)" v-if="!isSoundPositive">
                <md-icon>volume_mute</md-icon>
            </md-button>
        </div>

        <div class="floating-2">
            <md-card v-if="isInfoGh" class="md-primary">
            <md-card-header>
                <md-avatar>
                <img src="../../public/GitHub-Mark-64px.png" alt="Github">
                </md-avatar>

                <md-card-header-text>
                <div class="md-title">My Github</div>
                <div class="md-subhead">And this Repo</div>
                </md-card-header-text>

            </md-card-header>

            <md-card-actions>
                <a href="https://github.com/damarkrisnandi" target="_blank">
                    <md-button>My Github</md-button>
                </a>
                <a href="https://github.com/damarkrisnandi/vue-village">
                    <md-button>This Repo</md-button>
                </a>
            </md-card-actions>
            </md-card>
        </div>
    </div>
</template>

<script>
import ControlsGuide from './ControlsGuide.vue'
import PixiMain from './pixi/main'
import CityMap from './pixi/citymap'
export default {
    data:() => {
        return {
            pixi: new PixiMain(),
            app: null,
            player: null,
            cityMapBlock: null,
            unit: 16,
            sound: {volume: 0.05},
            isSoundPositive: true,
            isInfoGh: false,
            animations: {
                standDown: null,
                standUp: null,
                standLeft: null,
                standRight: null,

                walkDown: null,
                walkUp: null,
                walkLeft: null,
                walkRight: null
            }
        }
    },
    components: {
        ControlsGuide
    },
    created() {
        this.initializeWorld();
        this.initializeMap();
        this.initializePlayer();
        // this.initializeMusic();
        window.addEventListener('keydown', this.keyDownHandler)
        window.addEventListener('keyup', this.keyUpHandler)
    },
    methods: {
        initializeWorld() {
            this.pixi.createWorld();
            this.app = this.pixi.app;
            document.body.append(this.app.view);
        },
        initializeMap() {
            this.cityMapBlock = this.pixi.createMap();
            this.cityMapBlock.opacity = 0;
            this.app.stage.addChild(this.cityMapBlock)
        },
        initializePlayer() {
            // this.player = this.pixi.createPlayer();
            this.animations = {
                standDown: this.pixi.playerStandDownAnimate(),
                standUp: this.pixi.playerStandUpAnimate(),
                standLeft: this.pixi.playerStandLeftAnimate(),
                standRight: this.pixi.playerStandRightAnimate(),

                walkDown: this.pixi.playerWalkDownAnimate(),
                walkUp: this.pixi.playerWalkUpAnimate(),
                walkLeft: this.pixi.playerWalkLeftAnimate(),
                walkRight: this.pixi.playerWalkRightAnimate()
            }
            this.player = this.animations.standDown;
            this.app.stage.addChild(this.player);
        },
        initializeMusic() {
            this.sound = this.pixi.initBackgrounMusic();
            this.sound.play();
        },
        updateCanvas() {
            // update setiap ada perubahan dalam game
            // this.app.stage.children[1] = this.player;
            this.app.stage.addChild(this.cityMapBlock);
            this.app.stage.addChild(this.player);
            // this.player.play();
        },
        keyDownHandler(e) {
        // Your handler code here
            let move = {x: 0, y: 0};
            const controls = {
                w: () => { 
                    this.player = this.animations.walkUp;
                    move = {x: 0, y: -1};
                },
                a: () => { 
                    this.player = this.animations.walkLeft
                    move = {x: -1, y: 0};
                },
                s: () => { 
                    this.player = this.animations.walkDown
                    move = {x: 0, y: 1};
                },
                d: () => { 
                    this.player = this.animations.walkRight
                    move = {x: 1, y: 0}; 
                }
            };

            try {
                controls[(e.key).toLowerCase()](); 
                if (this.pixi.checkAllCollision(move)) {
                    this.cityMapBlock.x -= (move.x * this.unit)
                    this.cityMapBlock.y -= (move.y * this.unit); 
                }
                // play the animations
                this.player.play();
                this.updateCanvas();
                // this.isInfoGh = false;
                // this.getAction(this.pixi.cityMapBlock.children[2].children[2], () => {
                //     this.isInfoGh = true;
                // })
                
            } catch (error) {
                console.log(error);
            }

        },

        keyUpHandler(e) {
            if (e) {
                const controls = {
                    w: () => { this.player = this.animations.standUp },
                    a: () => { this.player = this.animations.standLeft },
                    s: () => { this.player = this.animations.standDown },
                    d: () => { this.player = this.animations.standRight }
                };

                try {
                    controls[(e.key).toLowerCase()](); 
                    // play the animations
                    this.player.play();
                } catch (error) {}
                this.updateCanvas();
            }
        },
        volume(x) {
            // this.sound.stop();
            this.sound.volume(x);
            // this.sound.play();
            if (x > 0) {
                this.isSoundPositive = true;
            } else {
                this.isSoundPositive = false;
            }
        },

        getAction(object, action) {
            if (this.pixi.onPosition(this.player, object)) {
                action();
            }
        }
        
    }
}
</script>

<style>

    .floating {
        position: fixed;
        bottom:0;
        right: 0;
        margin-bottom: 16px;
        margin-right: 16px;
        opacity: 0.8;
        z-index: 999;
    }

    .floating-2 {
        position: fixed;
        top:0;
        right: 0;
        margin-top: 16px;
        margin-right: 16px;
        opacity: 0.8;
        z-index: 999;
    }

    .floating-top-left {
        position: fixed;
        top:0;
        left: 0;
        margin-top: 16px;
        margin-left: 16px;
        opacity: 0.6;
        z-index: 999;
    }
</style>