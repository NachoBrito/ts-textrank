import Word from "./Word"

export default class Sentence {
    readonly raw: string
    readonly words: Word[]
    readonly position: number

    score: number = 0

    constructor(raw: string, words: Word[], position: number) {
        this.words = words
        this.raw = raw
        this.position = position
    }

    getNormalized(): string {
        const normalizedWords = this.words.map((w) => w.normalized)
        return normalizedWords.join(" ")
    }
}
