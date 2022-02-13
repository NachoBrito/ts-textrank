import SentenceSimilarity from "./SentenceSimilarity";
import Text from "./Text";
import TextParser from "./TextParser";

export interface SummarizerConfig {

    getSimilarityFunction(): SentenceSimilarity

    getSentenceCount(): number

    getTextParser(): TextParser

    getDampingFactor(): number
}

/**
 * Absolute count config
 */
export class AbsoluteSummarizerConfig implements SummarizerConfig {

    private readonly sentenceCount: number
    private readonly similarity: SentenceSimilarity
    private readonly parser: TextParser
    private readonly dampingFactor: number

    constructor(sentenceCount: number, similarity: SentenceSimilarity, parser: TextParser, dampingFactor: number) {
        this.sentenceCount = sentenceCount
        this.similarity = similarity
        this.parser = parser
        this.dampingFactor = dampingFactor
        this.validate()
    }
    private validate() {
        if (this.sentenceCount < 1) {
            throw new Error(`sentence count ${this.sentenceCount} is not valid. Must be 0 < d`)
        }        
        if (this.dampingFactor < 0 || this.dampingFactor > 1) {
            throw new Error(`damping factor ${this.dampingFactor} is not valid. Must be 0 < d < 1`)
        }
    }
    getDampingFactor(): number {
        return this.dampingFactor
    }
    getTextParser(): TextParser {
        return this.parser
    }
    getSimilarityFunction(): SentenceSimilarity {
        return this.similarity
    }
    getSentenceCount(): number {
        return this.sentenceCount
    }
}

export class RelativeSummarizerConfig implements SummarizerConfig {
    private readonly sentenceCount: number
    private readonly similarity: SentenceSimilarity
    private readonly parser: TextParser
    private readonly dampingFactor: number

    constructor(text: Text, sentenceRatio: number, similarity: SentenceSimilarity, parser: TextParser, dampingFactor: number) {
        this.sentenceCount = this.calculateSentenceCount(text, sentenceRatio)
        this.similarity = similarity
        this.parser = parser
        this.dampingFactor = dampingFactor
        this.validate()
    }

    private validate() {
        if (this.dampingFactor < 0 || this.dampingFactor > 1) {
            throw new Error(`damping factor ${this.dampingFactor} is not valid. Must be 0 < d < 1`)
        }
    }
    private calculateSentenceCount(text: Text, sentenceRatio: number): number {
        if (sentenceRatio <= 0 || sentenceRatio >= .5) {
            throw new Error(`sentence ratio ${sentenceRatio} is not valid. Must be 0 < ratio < .5`)
        }
        const total = text.sentences.length
        return total * sentenceRatio
    }
    getTextParser(): TextParser {
        return this.parser
    }
    getSimilarityFunction(): SentenceSimilarity {
        return this.similarity
    }
    getSentenceCount(): number {
        return this.sentenceCount
    }
    getDampingFactor(): number {
        return this.dampingFactor
    }
}