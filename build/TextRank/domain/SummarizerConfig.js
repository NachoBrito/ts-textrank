"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelativeSummarizerConfig = exports.AbsoluteSummarizerConfig = void 0;
/**
 * Absolute count config
 */
class AbsoluteSummarizerConfig {
    constructor(sentenceCount, similarity, parser, dampingFactor) {
        this.sentenceCount = sentenceCount;
        this.similarity = similarity;
        this.parser = parser;
        this.dampingFactor = dampingFactor;
        this.validate();
    }
    validate() {
        if (this.sentenceCount < 1) {
            throw new Error(`sentence count ${this.sentenceCount} is not valid. Must be 0 < d`);
        }
        if (this.dampingFactor < 0 || this.dampingFactor > 1) {
            throw new Error(`damping factor ${this.dampingFactor} is not valid. Must be 0 < d < 1`);
        }
    }
    getDampingFactor() {
        return this.dampingFactor;
    }
    getTextParser() {
        return this.parser;
    }
    getSimilarityFunction() {
        return this.similarity;
    }
    getSentenceCount() {
        return this.sentenceCount;
    }
}
exports.AbsoluteSummarizerConfig = AbsoluteSummarizerConfig;
class RelativeSummarizerConfig {
    constructor(text, sentenceRatio, similarity, parser, dampingFactor) {
        this.sentenceCount = this.calculateSentenceCount(text, sentenceRatio);
        this.similarity = similarity;
        this.parser = parser;
        this.dampingFactor = dampingFactor;
        this.validate();
    }
    validate() {
        if (this.dampingFactor < 0 || this.dampingFactor > 1) {
            throw new Error(`damping factor ${this.dampingFactor} is not valid. Must be 0 < d < 1`);
        }
    }
    calculateSentenceCount(text, sentenceRatio) {
        if (sentenceRatio <= 0 || sentenceRatio >= .5) {
            throw new Error(`sentence ratio ${sentenceRatio} is not valid. Must be 0 < ratio < .5`);
        }
        const total = text.sentences.length;
        return total * sentenceRatio;
    }
    getTextParser() {
        return this.parser;
    }
    getSimilarityFunction() {
        return this.similarity;
    }
    getSentenceCount() {
        return this.sentenceCount;
    }
    getDampingFactor() {
        return this.dampingFactor;
    }
}
exports.RelativeSummarizerConfig = RelativeSummarizerConfig;
