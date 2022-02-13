import DefaultTextParser from "../../../../src/TextRank/domain/DefaultTextParser"
import SorensenDiceSimilarity from "../../../../src/TextRank/domain/SorensenDiceSimilarity"
import Summarizer from "../../../../src/TextRank/application/Summarizer";
import { AbsoluteSummarizerConfig, RelativeSummarizerConfig } from "../../../../src/TextRank/application/SummarizerConfig"
import Text from "../../../../src/TextRank/domain/Text";

describe("Summarizer config", () => {
    it("should validate config", () => {

        const parser = new DefaultTextParser()
        const sim = new SorensenDiceSimilarity()
        const text = new Text("", [])

        expect(() => {
            new AbsoluteSummarizerConfig(0, sim, parser, .8, Summarizer.SORT_SCORE)
        }).toThrowError()

        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, -1, Summarizer.SORT_SCORE)
        }).toThrowError()

        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, 2, Summarizer.SORT_SCORE)
        }).toThrowError()
        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, .8, -1)
        }).toThrowError()
        expect(() => {
            new RelativeSummarizerConfig(0, sim, parser, 2, Summarizer.SORT_SCORE)
        }).toThrowError()

        expect(() => {
            new RelativeSummarizerConfig(1, sim, parser, 2, Summarizer.SORT_SCORE)
        }).toThrowError()

        expect(() => {
            new RelativeSummarizerConfig(.1, sim, parser, 2, -1)
        }).toThrowError()        
    })
})