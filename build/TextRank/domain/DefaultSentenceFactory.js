"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stopword_1 = __importDefault(require("stopword"));
const Sentence_1 = __importDefault(require("./Sentence"));
const Word_1 = __importDefault(require("./Word"));
class DefaultTextParser {
    /**
     *
     * @param sentence
     */
    parse(text, language) {
        const tokens = this.tokenize(text);
        const words = tokens.map(t => new Word_1.default(t));
        const filtered = this.filter(words, language);
        return new Sentence_1.default(filtered);
    }
    /**
     *
     * @param words
     * @param language
     * @returns
     */
    filter(words, language) {
        //@ts-ignore
        let stop = stopword_1.default[language];
        return words.filter(w => {
            return !stop.includes(w.normalized) && !stop.includes(w.word);
        });
    }
    /**
     *
     * @param sentence
     * @returns
     */
    tokenize(sentence) {
        const parts = sentence
            //remove all non-word 
            .replace(/[^\p{L}\s]/gu, "")
            //collapse multiple spaces
            .replace(/\s+/g, " ")
            //split by space
            .split(" ");
        return parts;
    }
}
exports.default = DefaultTextParser;
