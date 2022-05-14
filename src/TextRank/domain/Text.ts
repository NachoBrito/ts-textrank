import Sentence from "./Sentence"

export default class Text {
	readonly raw: string
	readonly sentences: Sentence[]

	constructor(raw: string, sentences: Sentence[]) {
		this.raw = raw
		this.sentences = sentences
	}

	getNormalized() {
		return this.sentences.map((s) => s.getNormalized()).join("\n")
	}
}
