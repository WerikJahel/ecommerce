"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const crypto_1 = require("crypto");
const domain_exception_1 = require("./domain.exception");
const isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    get id() {
        return this._id;
    }
    set id(value) {
        if (!Entity.validUUID(value)) {
            throw new domain_exception_1.IDEntityUUIDInvalid();
        }
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
    static validUUID(UUIDD) {
        let padraoUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return padraoUUID.test(UUIDD);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map