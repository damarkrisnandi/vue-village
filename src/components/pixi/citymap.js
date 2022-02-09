export default class CityMap {
    map = [];
    mapSize = {x: 50, y: 50}

    init() {
        for (let y = 0; y < this.mapSize.y; y++) {
            const mapy = []
            for (let x = 0; x < this.mapSize.x; x++) {
                if (x === 0 && y === 0) mapy.push('q');
                else if (x === 0 && y === this.mapSize.y - 1) mapy.push('z');
                else if (x === this.mapSize.x - 1 && y === 0) mapy.push('e');
                else if (x === this.mapSize.x - 1 && y === this.mapSize.y - 1) mapy.push('c');
                else if (x === 0) mapy.push('qz');
                else if (x === this.mapSize.x - 1) mapy.push('ec');
                else if (y === 0) mapy.push('qe');
                else if (y === this.mapSize.y - 1) mapy.push('zc');
                else mapy.push('.');
            }
            this.map.push(mapy);
        }

    }
}