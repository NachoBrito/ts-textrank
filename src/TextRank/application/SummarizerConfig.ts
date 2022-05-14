import SentenceSimilarity from "../domain/SentenceSimilarity"
import TextParser from "../domain/TextParser"
import Text from "../domain/Text"
import { SORT_BY } from "./Summarizer"

export interface SummarizerConfig {
    getSimilarityFunction(): SentenceSimilarity

    getSentenceCount(text: Text): number

    getTextParser(): TextParser

    getDampingFactor(): number

    getSortMode(): number
}

/**
 * Absolute count config
 */
export class AbsoluteSummarizerConfig implements SummarizerConfig {
    private readonly sentenceCount: number
    private readonly similarity: SentenceSimilarity
    private readonly parser: TextParser
    private readonly dampingFactor: number
    private readonly sortMode: number

    constructor(
        sentenceCount: number,
        similarity: SentenceSimilarity,
        parser: TextParser,
        dampingFactor: number,
        sortMode: number
    ) {
        this.sentenceCount = sentenceCount
        this.similarity = similarity
        this.parser = parser
        this.dampingFactor = dampingFactor
        this.sortMode = sortMode
        this.validate()
    }

    private validate() {
        if (this.sentenceCount < 1) {
            throw new Error(`sentence count ${this.sentenceCount} is not valid. Must be 0 < d`)
        }
        if (this.dampingFactor < 0 || this.dampingFactor > 1) {
            throw new Error(`damping factor ${this.dampingFactor} is not valid. Must be 0 < d < 1`)
        }
        if (this.sortMode !== SORT_BY.OCCURRENCE && this.sortMode !== SORT_BY.SCORE) {
            throw new Error(`sort mode ${this.sortMode} is not valid. Must be SORT_BY.OCCURRENCE or SORT_BY.SCORE`)
        }
    }
    getSortMode(): number {
        return this.sortMode
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
    getSentenceCount(text: Text): number {
        return this.sentenceCount
    }
}

export class RelativeSummarizerConfig implements SummarizerConfig {
    private readonly sentenceRatio: number
    private readonly similarity: SentenceSimilarity
    private readonly parser: TextParser
    private readonly dampingFactor: number
    private readonly sortMode: number

    constructor(
        sentenceRatio: number,
        similarity: SentenceSimilarity,
        parser: TextParser,
        dampingFactor: number,
        sortMode: number
    ) {
        this.sentenceRatio = sentenceRatio
        this.similarity = similarity
        this.parser = parser
        this.dampingFactor = dampingFactor
        this.sortMode = sortMode
        this.validate()
    }

    private validate() {
        if (this.sentenceRatio <= 0 || this.sentenceRatio >= 0.5) {
            throw new Error(`sentence ratio ${this.sentenceRatio} is not valid. Must be 0 < ratio < .5`)
        }
        if (this.dampingFactor < 0 || this.dampingFactor > 1) {
            throw new Error(`damping factor ${this.dampingFactor} is not valid. Must be 0 < d < 1`)
        }
        if (this.sortMode !== SORT_BY.OCCURRENCE && this.sortMode !== SORT_BY.SCORE) {
            throw new Error(`sort mode ${this.sortMode} is not valid. Must be SORT_BY.OCCURRENCE or SORT_BY.SCORE`)
        }
    }

    getSortMode(): number {
        return this.sortMode
    }

    private calculateSentenceCount(text: Text): number {
        const total = text.sentences.length
        return total * this.sentenceRatio
    }
    getTextParser(): TextParser {
        return this.parser
    }
    getSimilarityFunction(): SentenceSimilarity {
        return this.similarity
    }
    getSentenceCount(text: Text): number {
        return this.calculateSentenceCount(text)
    }
    getDampingFactor(): number {
        return this.dampingFactor
    }
}
