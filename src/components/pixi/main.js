import * as PIXI from 'pixi.js'
import CityMap from './citymap';
import { blockBuilder, blockBuilder2 } from './blockBuilder';
import GroupObject from './groupObject';
import {Howl} from 'howler';
import { Graphics, Sprite } from 'pixi.js';
export default class PixiMain {
    url = './assets/tilemap.png';
    urlWasd = './assets/WASD_grey.png';
    cityMapBlock = new PIXI.Container();
    cityMap = new CityMap();
    player = null;
    playerPos = {x: 0, y: 5}
    unit = 16;
    center = {x: Math.floor((window.innerWidth / 2) / this.unit) + 1, y: Math.floor((window.innerHeight / 2) / this.unit) + 1};
    // centerMap = {x: Math.floor((window.innerWidth / 2) / this.unit) - 9, y: Math.floor((window.innerHeight / 2) / this.unit) - 9};
    centerMap = {
        x: Math.floor((window.innerWidth / 2) / this.unit) + 1 - Math.floor(this.cityMap.mapSize.y / 2), 
        y: Math.floor((window.innerHeight / 2) / this.unit) + 1 - Math.floor(this.cityMap.mapSize.y / 2)
    };
    groupObject = new GroupObject();

    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        transparent: false,
        antialias: true
    })

    createWorld() {
        this.app.renderer.backgroundColor = 'black';
        this.app.renderer.view.style.position = 'absolute';
    }

    createMap() {
        this.cityMap.init();

        const blockMapping = this.characterMapping();
        // this.cityMap.map
        const basicMap = blockBuilder(this.url, this.unit, blockMapping, this.centerMap);
        this.cityMapBlock.addChild(basicMap)
        this.placeObject();
        return this.cityMapBlock;
    }

    placeObject() {
        // building
        const pos = {x: 7, y: 7}
        const objectBlocked = new PIXI.Container();
        const objectNonBlocked = new PIXI.Container();
        this.centerMap = {
            x: Math.floor((window.innerWidth / 2) / this.unit) + 1 - Math.floor(this.cityMap.mapSize.y / 2), 
            y: Math.floor((window.innerHeight / 2) / this.unit) + 1 - Math.floor(this.cityMap.mapSize.y / 2)
        };
        const newPos = {x: this.centerMap.x + pos.x - 1, y: this.centerMap.y + pos.y - 1};
        
        // object yg blocking
        objectBlocked.addChild(blockBuilder(this.url, this.unit, this.groupObject.getBuilding(6, 6), this.centerMap))
        objectBlocked.addChild(blockBuilder(this.url, this.unit, this.groupObject.getFence(20, 15), {x: newPos.x - 1, y: newPos.y - 1}))
        objectBlocked.addChild(blockBuilder(this.url, this.unit, this.groupObject.getRiver(this.cityMap.map[0].length, 3, 16), {x: this.centerMap.x, y: this.centerMap.y + 26}))

        // object yg tidak blocking
        objectNonBlocked.addChild(blockBuilder(this.url, this.unit, this.groupObject.getGarden(), {x: newPos.x + 9, y: newPos.y})) // 0
        objectNonBlocked.addChild(blockBuilder(this.url, this.unit, [{x: 11, y: 7, nowx: 1, nowy: 1}], {x: newPos.x + 6, y: newPos.y + 6})) // 1
        // objectNonBlocked.addChild(this.getGithub()) // 2
        objectNonBlocked.addChild(blockBuilder(this.url, this.unit, this.groupObject.getStreetToGate(), {x: this.centerMap.x + 9, y: this.centerMap.y + 12})) // 3

        this.cityMapBlock.addChild(objectBlocked);
        this.cityMapBlock.addChild(objectNonBlocked);
    }

    initBackgrounMusic() {
        const sound = new Howl({
            src: ['./assets/sound.wav'],
            autoplay: true,
            volume: 0.05,
            loop: true
        });
        return sound;
    }

    createPlayer() {
        const blockPlayer = [
            {x: 2, y: 1, nowx: 1, nowy: 1}
        ]
        this.player = blockBuilder(this.url, this.unit, blockPlayer, this.center);
        return this.player;
    }

    playerDown() {
        const blockPlayer = [
            {x: 2, y: 1, nowx: 1, nowy: 1}
        ]
        this.player = blockBuilder(this.url, this.unit, blockPlayer, this.center);
        return this.player;
    }

    playerLeft() {
        const blockPlayer = [
            {x: 2, y: 2, nowx: 1, nowy: 1}
        ]
        this.player = blockBuilder(this.url, this.unit, blockPlayer, this.center);
        return this.player;
    }

    playerRight() {
        const blockPlayer = [
            {x: 2, y: 3, nowx: 1, nowy: 1}
        ]
        this.player = blockBuilder(this.url, this.unit, blockPlayer, this.center);
        return this.player;
    }

    playerUp() {
        const blockPlayer = [
            {x: 2, y: 4, nowx: 1, nowy: 1}
        ]
        this.player = blockBuilder(this.url, this.unit, blockPlayer, this.center);
        return this.player;
    }

    characterMapping() {
        const blockMapping = [];
        for (let y = 0; y < this.cityMap.map.length; y++) {
            for (let x = 0; x < this.cityMap.map[y].length; x++) {
                const conditions = {
                    "q": () => {blockMapping.push({x: 5, y: 2, nowx: x + 1, nowy: y + 1})},
                    "qz": () => {blockMapping.push({x: 5, y: 3, nowx: x + 1, nowy: y + 1})},
                    "z": () => {blockMapping.push({x: 5, y: 4, nowx: x + 1, nowy: y + 1})},
                    "qe": () => {blockMapping.push({x: 6, y: 2, nowx: x + 1, nowy: y + 1})},
                    "e": () => {blockMapping.push({x: 7, y: 2, nowx: x + 1, nowy: y + 1})},
                    "ec": () => {blockMapping.push({x: 7, y: 3, nowx: x + 1, nowy: y + 1})},
                    "zc": () => {blockMapping.push({x: 6, y: 4, nowx: x + 1, nowy: y + 1})},
                    "c": () => {blockMapping.push({x: 7, y: 4, nowx: x + 1, nowy: y + 1})},
                    ".": () => {blockMapping.push({x: 6, y: 3, nowx: x + 1, nowy: y + 1})},
                    "#": () => {blockMapping.push({x: 2, y: 6, nowx: x + 1, nowy: y + 1})},
                }

                try {
                    conditions[this.cityMap.map[y][x]]();    
                } catch (error) {
                    console.log(error);
                }
                
            }
        }
        return blockMapping;
    }

    mapBounds() {
        return [
            'qz', 'qe', 'ec', 'zc'
        ]
    }

    collision(a, b) {
        const aBox = a.getBounds();
        const bBox = b.getBounds();

        return aBox.x !== bBox.x && aBox.y !== bBox.y
    }

    collisionObjvsCont(aObj, bCont, dir) {
        const aBox = aObj.getBounds();
        const allBounds = bCont.children.map(spr => spr.getBounds());

        return allBounds.find(data => data.x === aBox.x + (dir.x * this.unit) && data.y === aBox.y + (dir.y * this.unit)) ? false : true;
    }

    onPosition(a, b) {
        const aBox = a.getBounds();
        const bBox = b.getBounds();

        return aBox.x === bBox.x && aBox.y === bBox.y
    }

    collisionObjvsListCont(aObj, bConts, dir) {
        const aBox = aObj.getBounds();
        let allBounds = [];
        for (const b of bConts) {
            allBounds = b.children.map(spr => spr.getBounds());
        }

        return allBounds.find(data => data.x === aBox.x + (dir.x * this.unit) && data.y === aBox.y + (dir.y * this.unit)) ? false : true;
    }

    isPassable(object) {
        return !this.mapBounds().includes(object)
    }

    /**
         * @param x horizontal neighbor unit
         * @param y vertical neighbor unit
         * @returns object pada posisi (x, y) dari sekitar player.
         * - (1, 0) sebelah kanan
         * - (-1, 0) sebelah kiri
         * - (0, -1) di atas
         * - (0, 1) di bawah
         */
     getNeighbor(x, y) {
        const pos = {
            y: ((this.player.y + (this.unit * y))/ this.unit) + (this.center.y - 1) - ((this.cityMapBlock.y / this.unit) + (this.centerMap.y - 1)),
            x: ((this.player.x + (this.unit * x))/ this.unit) + (this.center.x - 1) - ((this.cityMapBlock.x / this.unit) + (this.centerMap.x - 1)) 
        };
        return this.cityMap.map[pos.y][pos.x];
    }

    getObjectImpassable() {
        const building = this.cityMapBlock.children[1]
        const fence = this.cityMapBlock.children[3]
        return [building];
    }

    createWasd() {
        return blockBuilder(this.urlWasd, this.unit, this.groupObject.getWASD(), {x: 1, y: 1})
    }

    checkAllCollision(dir) {
        let valid = true
        for (let container of this.cityMapBlock.children[1].children) {
            valid = valid && this.collisionObjvsCont(this.player, container, dir)
        }
        return valid;
    }

    getGithub() {
        const github = PIXI.Sprite.from('./GitHub-Mark-32px.png');
        github.scale.set(0.5, 0.5);
        github.x = (this.centerMap.x + 22) * this.unit;
        github.y = (this.centerMap.y + 5) * this.unit;
        return github;
    }
}