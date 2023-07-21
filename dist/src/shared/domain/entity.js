"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const crypto_1 = require("crypto");
const isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    constructor(id) {
        this.id = id ? id : (0, crypto_1.randomUUID)();
    }
    equals(object) {
        if (object == null || object == undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id == object._id;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map