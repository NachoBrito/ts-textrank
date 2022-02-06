import Word from "./Word";

export default class Sentence {
    readonly raw:string;
    readonly words: Word[];

    constructor(raw:string, words: Word[]) {
        this.words = words;
        this.raw = raw;
    }

    getNormalized(): string {
        const normalizedWords = this.words.map(w => w.normalized);
        return normalizedWords.join(" ");
    }
}