<template>
  
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
            sound: null
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
            const controls = {
                w: () => { 
                    this.player = this.pixi.playerUp();
                    if (
                        this.pixi.isPassable(this.pixi.getNeighbor(0, -1)) &&
                        this.pixi.checkAllCollision({x: 0, y: -1})
                    ) {
                        this.cityMapBlock.y += this.unit; 
                        
                    }
                },
                a: () => { 
                    this.player = this.pixi.playerLeft()
                    if (
                        this.pixi.isPassable(this.pixi.getNeighbor(-1, 0)) &&
                        this.pixi.checkAllCollision({x: -1, y: 0})
                    ) {
                        this.cityMapBlock.x += this.unit;  
                    }
                },
                s: () => { 
                    this.player = this.pixi.playerDown()
                    if (
                        this.pixi.isPassable(this.pixi.getNeighbor(0, 1)) &&
                        this.pixi.checkAllCollision({x: 0, y: 1})
                    ) {
                        this.cityMapBlock.y -= this.unit;
                        
                    }
                },
                d: () => { 
                    this.player = this.pixi.playerRight()
                    if (
                        this.pixi.isPassable(this.pixi.getNeighbor(1, 0)) &&
                        this.pixi.checkAllCollision({x: 1, y: 0})
                    ) {
                        this.cityMapBlock.x -= this.unit;
                        
                    } 
                }
            };

            try {
                controls[(e.key).toLowerCase()](); 
                this.updateCanvas();
                
            } catch (error) {
                console.log(error);
            }

        }
        
    }
}
</script>

<style>

</style>