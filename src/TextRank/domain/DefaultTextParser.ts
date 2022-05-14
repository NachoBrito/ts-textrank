import stopword from "stopword"
import Sentence from "./Sentence"
import TextParser from "./TextParser"
import Word from "./Word"
import Text from "./Text"

export default class DefaultTextParser implements TextParser {
	/**
	 *
	 * @param text
	 * @param language
	 */
	parse(text: string, language: string): Text {
		const sentences: Record<string, Sentence> = {}
		let sent: Sentence

		//Strategy: split text by sentence boundaries:
		//- a dot followed by anything but a wordy
		//- \n,¡!¿? in any position
		const rxSep = /\.[^\w]|[\n¡!\?¿]/g
		const parts = text.split(rxSep)
		let position = 1
		parts.map((rawSentence) => {
			rawSentence = rawSentence.trim()
			if (rawSentence === "") {
				return
			}
			sent = this.buildSentence(rawSentence, language, position)
			sentences[sent.getNormalized()] = sent
			position++
		})
		return new Text(text, Object.values(sentences))
	}

	/**
	 *
	 * @param raw
	 * @param language
	 * @param position
	 * @returns the sentence model
	 */
	private buildSentence(raw: string, language: string, position: number): Sentence {
		const tokens = this.tokenize(raw)
		const words: Word[] = tokens.map((t) => new Word(t))
		const filtered = this.filter(words, language)

		return new Sentence(raw, filtered, position)
	}

	/**
	 * removes stopwords
	 * @param words
	 * @param language
	 * @returns the filtered list
	 */
	private filter(words: Word[], language: string): Word[] {
		//@ts-ignore
		let stop = stopword[language]

		return words.filter((w) => {
			return !stop.includes(w.normalized) && !stop.includes(w.word)
		})
	}

	/**
	 *
	 * @param sentence
	 * @returns the list of tokens of a sentence
	 */
	private tokenize(sentence: string): string[] {
		const parts = sentence
			//remove all non-word
			.replace(/[^\p{L}\s]/gu, "")
			//collapse multiple spaces
			.replace(/\s+/g, " ")
			//remove trailing spaces
			.trim()
			//split by space
			.split(" ")
		return parts
	}
}
