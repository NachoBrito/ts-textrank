import DefaultTextParser from "../../../../src/TextRank/domain/DefaultTextParser"
import SorensenDiceSimilarity from "../../../../src/TextRank/domain/SorensenDiceSimilarity"
import { AbsoluteSummarizerConfig, RelativeSummarizerConfig } from "../../../../src"
import Text from "../../../../src/TextRank/domain/Text";
import { SORT_BY } from "../../../../src/TextRank/application/Summarizer";

describe("Summarizer config", () => {
    it("should validate config", () => {

        const parser = new DefaultTextParser()
        const sim = new SorensenDiceSimilarity()
        const text = new Text("", [])

        expect(() => {
            new AbsoluteSummarizerConfig(0, sim, parser, .8, SORT_BY.SCORE)
        }).toThrowError()

        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, -1, SORT_BY.SCORE)
        }).toThrowError()

        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, 2, SORT_BY.SCORE)
        }).toThrowError()
        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, .8, -1)
        }).toThrowError()
        expect(() => {
            new RelativeSummarizerConfig(0, sim, parser, 2, SORT_BY.SCORE)
        }).toThrowError()

        expect(() => {
            new RelativeSummarizerConfig(1, sim, parser, 2, SORT_BY.SCORE)
        }).toThrowError()

        expect(() => {
            new RelativeSummarizerConfig(.1, sim, parser, 2, -1)
        }).toThrowError()        
    })
})