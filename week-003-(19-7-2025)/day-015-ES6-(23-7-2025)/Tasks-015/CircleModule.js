//=================================================================
//======================= Import Main Class =======================
//=================================================================

import Shape from "./ShapeModule.js";

//=================================================================
//======================== Circle Class ===========================
//=================================================================

class Circle extends Shape {
    #x = 0;
    #y = 0;
    #radius = 0;

    constructor(x, y, rad, colorVal) {
        super(colorVal);
        this.X = x;
        this.Y = y;
        this.Radius = rad;
    }

    get X() {
        return this.#x;
    }

    set X(value) {
        if (/^\d+(\.\d+)?$/.test(value)) {
            this.#x = +value.toFixed(2);
        } else {
            console.log("Enter Valid Number");
        }
    }

    get Y() {
        return this.#y;
    }

    set Y(value) {
        if (/^\d+(\.\d+)?$/.test(value)) {
            this.#y = +value.toFixed(2);
        } else {
            console.log("Enter Valid Number");
        }
    }

    get Radius() {
        return this.#radius;
    }

    set Radius(value) {
        if (/^\d+(\.\d+)?$/.test(value)) {
            this.#radius = +value.toFixed(2);
        } else {
            console.log("Enter Valid Number");
        }
    }

    getArea() {
        this.DrawShape();
        const area = (Math.PI * Math.pow(this.Radius, 2)).toFixed(2);
        console.log(`Circle Area: ${area}`);
        return area;
    }
}

export default Circle;
