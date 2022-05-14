import Text from "../domain/Text"
import Graph from "../domain/Graph"
import Sentence from "../domain/Sentence"
import LoggerInterface from "../infrastructure/LoggerInterface"
import { SummarizerConfig } from "./SummarizerConfig"

export enum SORT_BY {
	SCORE,
	OCCURRENCE,
}

export default class Summarizer {
	private logger: LoggerInterface
	private readonly config: SummarizerConfig
	private graph: Graph | null = null
	private text: Text | null = null

	debug: boolean = false

	private threshold = 0.0001
	private maxLoops = 50

	constructor(config: SummarizerConfig, logger: LoggerInterface) {
		this.config = config
		this.logger = logger
	}

	summarize(text: string, language: string): string[] {
		this.text = this.config.getTextParser().parse(text, language)
		this.graph = new Graph(this.text, this.config.getSimilarityFunction())

		const sentenceCount = this.text.sentences.length
		let error
		for (let i = 0; i < this.maxLoops; i++) {
			//this.logger.debug("Starting iteration %d", i)
			for (let j = 0; j < sentenceCount; j++) {
				error = this.calculateScore(j)

				if (error < this.threshold) {
					break
				}
			}
			if (error < this.threshold) {
				this.logger.debug("Error rate %d below threshold in iteration %d. Exit.", error, i)
				break
			}
		}

		return this.buildSummary()
	}

	private buildSummary(): string[] {
		if (!this.text || !this.graph) {
			throw new Error("Summarizer not initialized!")
		}

		//sort by score and take the first N
		let sentences = this.text.sentences
			.sort((s1: Sentence, s2: Sentence) => s2.score - s1.score)
			.slice(0, this.config.getSentenceCount(this.text))

		if (this.debug) {
			this.logger.debug("Summary generated with %d sentences:", sentences.length)
			sentences.map((s: Sentence) => {
				this.logger.debug("[%f] %s", s.score, s.raw)
			})
		}
		if (this.config.getSortMode() === SORT_BY.OCCURRENCE) {
			//sort winners by position
			sentences.sort((s1: Sentence, s2: Sentence) => s1.position - s2.position)
		}

		return sentences.map((s: Sentence) => s.raw)
	}

	/**
	 * Calculates score for sentence i, returning the error value
	 * as the difference with previous value
	 *
	 * @param i
	 * @returns error
	 */
	private calculateScore(i: number): any {
		if (!this.text || !this.graph) {
			throw new Error("Summarizer not initialized!")
		}

		const d = this.config.getDampingFactor()
		let sum = 0,
			w = 0,
			W = 0,
			S = 0
		for (let j = 0; j < this.text.sentences.length; j++) {
			w = this.graph.weights[i][j]
			S = this.text.sentences[j].score

			W = this.graph.weightSums[j]

			sum += (S * w) / W
		}
		const s = 1 - d + d * sum

		const error = Math.abs(s - this.text.sentences[i].score)
		this.text.sentences[i].score = s

		return error
	}
}
