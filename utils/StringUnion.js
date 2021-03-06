"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUnion = void 0;
// https://stackoverflow.com/questions/36836011/checking-validity-of-string-literal-union-type-at-runtime
// TypeScript will infer a string union type from the literal values passed to
// this function. Without `extends string`, it would instead generalize them
// to the common string type.
var StringUnion = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    Object.freeze(values);
    var valueSet = new Set(values);
    var guard = function (value) {
        return valueSet.has(value);
    };
    var check = function (value) {
        if (!guard(value)) {
            var actual = JSON.stringify(value);
            var expected = values.map(function (s) { return JSON.stringify(s); }).join(" | ");
            throw new TypeError("Value '" + actual + "' is not assignable to type '" + expected + "'.");
        }
        return value;
    };
    var unionNamespace = { guard: guard, check: check, values: values };
    return Object.freeze(unionNamespace);
};
exports.StringUnion = StringUnion;
//# sourceMappingURL=StringUnion.js.map