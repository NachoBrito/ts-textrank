"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    constructor(text, similarityFunction) {
        this.text = text;
        this.weights = this.calculateWeights(similarityFunction);
    }
    /**
     *
     * @param similarityFunction
     * @returns
     */
    calculateWeights(similarityFunction) {
        const result = [];
        const sentences = this.text.sentences;
        const total = sentences.length;
        for (let i = 0; i < total; i++) {
            result[i] = [];
            for (let j = 0; j < total; j++) {
                if (i === j) {
                    result[i][j] = 1;
                }
                else {
                    result[i][j] = similarityFunction.getSimilarity(sentences[i], sentences[j]);
                }
            }
        }
        return result;
    }
}
exports.default = Graph;
