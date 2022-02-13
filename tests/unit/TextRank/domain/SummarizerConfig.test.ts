import DefaultTextParser from "../../../../src/TextRank/domain/DefaultTextParser"
import SorensenDiceSimilarity from "../../../../src/TextRank/domain/SorensenDiceSimilarity"
import { AbsoluteSummarizerConfig, RelativeSummarizerConfig } from "../../../../src/TextRank/domain/SummarizerConfig"
import Text from "../../../../src/TextRank/domain/Text";

describe("Summarizer config", () => {
    it("should validate config", () => {

        const parser = new DefaultTextParser()
        const sim = new SorensenDiceSimilarity()
        const text = new Text("", [])

        expect(() => {
            new AbsoluteSummarizerConfig(0, sim, parser, .8)
        }).toThrowError()

        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, -1)
        }).toThrowError()

        expect(() => {
            new AbsoluteSummarizerConfig(1, sim, parser, 2)
        }).toThrowError()    
        
        expect(() => {
            new RelativeSummarizerConfig(text,0, sim, parser, 2)
        }).toThrowError() 
        
        expect(() => {
            new RelativeSummarizerConfig(text,1, sim, parser, 2)
        }).toThrowError()          
    })
})