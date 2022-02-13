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
        const sentences = this.text.sentences;
        const total = sentences.length;
        const result = [];
        for (let i = 0; i < total; i++) {
            result[i] = Array(total).fill(0);
            for (let j = 0; j < total; j++) {
                if (i === j) {
                    //diagonal
                    result[i][j] = 1;
                }
                else if (i > j) {
                    //matrix is symmetric
                    result[i][j] = result[j][i];
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
