"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Text {
    constructor(raw, sentences) {
        this.raw = raw;
        this.sentences = sentences;
    }
    getNormalized() {
        return this.sentences.map(s => s.getNormalized()).join("\n");
    }
}
exports.default = Text;
