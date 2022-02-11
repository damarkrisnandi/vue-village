<template>
    <div>
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
            isInfoGh: false
        }
    },
    created() {
        this.initializeWorld();
        this.initializeMap();
        this.initializePlayer();
        this.initializeMusic();
        window.addEventListener('keydown', this.keyDownHandler)
    },
    methods: {
        initializeWorld() {
            this.pixi.createWorld();
            this.app = this.pixi.app;
            document.body.append(this.app.view);
        },
        initializeMap() {
            this.cityMapBlock = this.pixi.createMap();
            this.app.stage.addChild(this.cityMapBlock)
        },
        initializePlayer() {
            this.player = this.pixi.createPlayer();
            this.app.stage.addChild(this.player);

            const wasd = this.pixi.createWasd();
            wasd.y = window.innerHeight - this.pixi.unit * 7;
            wasd.x = this.pixi.unit * 1;
            this.app.stage.addChild(wasd);
        },
        initializeMusic() {
            this.sound = this.pixi.initBackgrounMusic();
            this.sound.play();
        },
        updateCanvas() {
            // update setiap ada perubahan dalam game
            this.app.stage.addChild(this.cityMapBlock);
            this.app.stage.addChild(this.player);
        },
        keyDownHandler(e) {
        // Your handler code here
            let move = {x: 0, y: 0};
            const controls = {
                w: () => { 
                    this.player = this.pixi.playerUp();
                    move = {x: 0, y: -1};
                },
                a: () => { 
                    this.player = this.pixi.playerLeft()
                    move = {x: -1, y: 0};
                },
                s: () => { 
                    this.player = this.pixi.playerDown()
                    move = {x: 0, y: 1};
                },
                d: () => { 
                    this.player = this.pixi.playerRight()
                    move = {x: 1, y: 0}; 
                }
            };

            try {
                controls[(e.key).toLowerCase()](); 
                if (
                    this.pixi.isPassable(this.pixi.getNeighbor(move.x, move.y)) &&
                    this.pixi.checkAllCollision(move)
                ) {
                    this.cityMapBlock.x -= (move.x * this.unit)
                    this.cityMapBlock.y -= (move.y * this.unit); 
                }

                this.updateCanvas();
                // this.isInfoGh = false;
                // this.getAction(this.pixi.cityMapBlock.children[2].children[2], () => {
                //     this.isInfoGh = true;
                // })
                
            } catch (error) {
                console.log(error);
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
</style>