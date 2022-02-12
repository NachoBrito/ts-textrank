"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stopword_1 = __importDefault(require("stopword"));
const Sentence_1 = __importDefault(require("./Sentence"));
const Word_1 = __importDefault(require("./Word"));
const Text_1 = __importDefault(require("./Text"));
class DefaultTextParser {
    /**
     *
     * @param sentence
     */
    parse(text, language) {
        //separators: o, !, ¡, ¿, ?
        const rx = /[^\.¡!\?¿]+[\.¡!\?¿]+/g;
        let result, rawSentence, limiter;
        const sentences = [];
        let position = 1;
        while ((result = rx.exec(text)) !== null) {
            rawSentence = result[0].trim();
            sentences.push(this.buildSentence(rawSentence, language, position));
            position++;
        }
        return new Text_1.default(text, sentences);
    }
    /**
     *
     * @param raw
     * @param limiter
     * @param language
     * @returns the sentence model
     */
    buildSentence(raw, language, position) {
        const tokens = this.tokenize(raw);
        const words = tokens.map(t => new Word_1.default(t));
        const filtered = this.filter(words, language);
        return new Sentence_1.default(raw, filtered, position);
    }
    /**
     * removes stopwords
     * @param words
     * @param language
     * @returns the filtered list
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
     * @returns the list of tokens of a sentence
     */
    tokenize(sentence) {
        const parts = sentence
            //remove all non-word 
            .replace(/[^\p{L}\s]/gu, "")
            //collapse multiple spaces
            .replace(/\s+/g, " ")
            //remove trailing spaces
            .trim()
            //split by space
            .split(" ");
        return parts;
    }
}
exports.default = DefaultTextParser;
