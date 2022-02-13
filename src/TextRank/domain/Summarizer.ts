import LoggerInterface from "../infraestructure/LoggerInterface";
import Graph from "./Graph";
import Sentence from "./Sentence";
import { SummarizerConfig } from "./SummarizerConfig";
import Text from "./Text";

export default class Summarizer {
    private logger: LoggerInterface
    private readonly config: SummarizerConfig
    private graph: Graph | null = null
    private text: Text | null = null

    private threshold = .0001
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
            this.logger.debug("Starting iteration %d", i)
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
        let sentences = this
            .text
            .sentences
            .sort((s1: Sentence, s2: Sentence) => s1.score - s2.score)
            .slice(0,this.config.getSentenceCount())

        //sort winners by position and return strings
        sentences.sort((s1: Sentence, s2: Sentence) => s1.position - s2.position)
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
        let sum = 0, w = 0, W = 0, S = 0
        for (let j = 0; j < this.text.sentences.length; j++) {
            w = this.graph.weights[i][j]
            S = this.text.sentences[j].score

            W = this.graph.weights[j].reduce((a, b) => a + b, 0)

            sum += S * w / W
        }
        const s = (1 - d) + d * sum

        const error = Math.abs(s - this.text.sentences[i].score)
        this.text.sentences[i].score = s

        return error
    }
}