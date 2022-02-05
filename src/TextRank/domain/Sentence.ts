import Word from "./Word";

export default class Sentence {
    readonly words: Word[];

    constructor(words: Word[]) {
        this.words = words;
    }

    getNormialized(): string {
        const normalizedWords = this.words.map(w => w.normalized);
        return normalizedWords.join(" ");
    }
}