"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transliteration_1 = require("transliteration");
class Word {
    constructor(word) {
        this.word = word;
        this.normalized = (0, transliteration_1.transliterate)(word).toLocaleLowerCase();
    }
}
exports.default = Word;
