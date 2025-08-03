//=================================================================
//======================= Import Main Class =======================
//=================================================================

import Shape from "./ShapeModule.js";

//=================================================================
//======================== Rectangle Class ========================
//=================================================================

class Rectangle extends Shape {
    #width = 0;
    #height = 0;

    constructor(widthValue, heightValue, colorValue) {
        super(colorValue);
        this.Width = widthValue;
        this.Height = heightValue;
    }

    get Width() {
        return this.#width;
    }

    set Width(value) {
        if (/^\d+(\.\d+)?$/.test(value)) {
            this.#width = +value.toFixed(2);
        } else {
            console.log("Enter Valid Number");
        }
    }

    get Height() {
        return this.#height;
    }

    set Height(value) {
        if (/^\d+(\.\d+)?$/.test(value)) {
            this.#height = +value.toFixed(2);
        } else {
            console.log("Enter Valid Number");
        }
    }

    getArea() {
        this.DrawShape();
        const area = (this.#width * this.#height).toFixed(2);
        console.log(`Rectangle Area: ${area}`);
        return area;
    }
}

//=================================================================
//========================== Square Class =========================
//=================================================================

class Square extends Rectangle {
    constructor(widthValue, heightValue, colorValue) {
        super(widthValue, heightValue, colorValue);
    }
    getArea() {
        this.DrawShape();
        const area = (this.Width * this.Height).toFixed(2);
        console.log(`Square Area: ${area}`);
        return area;
    }
}

export { Rectangle, Square };
