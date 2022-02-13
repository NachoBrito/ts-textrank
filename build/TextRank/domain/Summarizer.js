"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Graph_1 = __importDefault(require("./Graph"));
class Summarizer {
    constructor(config, logger) {
        this.graph = null;
        this.text = null;
        this.threshold = .0001;
        this.maxLoops = 50;
        this.config = config;
        this.logger = logger;
    }
    summarize(text, language) {
        this.text = this.config.getTextParser().parse(text, language);
        this.graph = new Graph_1.default(this.text, this.config.getSimilarityFunction());
        const sentenceCount = this.text.sentences.length;
        let error;
        for (let i = 0; i < this.maxLoops; i++) {
            this.logger.debug("Starting iteration %d", i);
            for (let j = 0; j < sentenceCount; j++) {
                error = this.calculateScore(j);
                if (error < this.threshold) {
                    break;
                }
            }
            if (error < this.threshold) {
                this.logger.debug("Error rate %d below threshold in iteration %d. Exit.", error, i);
                break;
            }
        }
        return this.buildSummary();
    }
    buildSummary() {
        if (!this.text || !this.graph) {
            throw new Error("Summarizer not initialized!");
        }
        //sort by score and take the first N
        let sentences = this
            .text
            .sentences
            .sort((s1, s2) => s1.score - s2.score)
            .slice(0, this.config.getSentenceCount());
        //sort winners by position and return strings
        sentences.sort((s1, s2) => s1.position - s2.position);
        return sentences.map((s) => s.raw);
    }
    /**
     * Calculates score for sentence i, returning the error value
     * as the difference with previous value
     *
     * @param i
     * @returns error
     */
    calculateScore(i) {
        if (!this.text || !this.graph) {
            throw new Error("Summarizer not initialized!");
        }
        const d = this.config.getDampingFactor();
        let sum = 0, w = 0, W = 0, S = 0;
        for (let j = 0; j < this.text.sentences.length; j++) {
            w = this.graph.weights[i][j];
            S = this.text.sentences[j].score;
            W = this.graph.weights[j].reduce((a, b) => a + b, 0);
            sum += S * w / W;
        }
        const s = (1 - d) + d * sum;
        const error = Math.abs(s - this.text.sentences[i].score);
        this.text.sentences[i].score = s;
        return error;
    }
}
exports.default = Summarizer;
