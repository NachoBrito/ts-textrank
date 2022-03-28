import Summarizer from "../../../../src/TextRank/application/Summarizer";
import {AbsoluteSummarizerConfig} from "../../../../src/TextRank/application/SummarizerConfig";
import SorensenDiceSimilarity from '../../../../src/TextRank/domain/SorensenDiceSimilarity';
import DefaultTextParser from '../../../../src/TextRank/domain/DefaultTextParser';
import NullLogger from '../../../../src/TextRank/infraestructure/NullLogger';

describe("Summarizer", () => {
    it("Should summarize text", () => {
        const txt=`Este texto con 1.200 tiene dos frases. No tres.`
        
        const sim = new SorensenDiceSimilarity()
        const parser = new DefaultTextParser()
        const config = new AbsoluteSummarizerConfig(5,sim,parser,.85,Summarizer.SORT_SCORE)
        const logger = new NullLogger()
        const summarizer = new Summarizer(config, logger)

        const sentences = summarizer.summarize(txt, 'es')

        //console.log(sentences)

        expect(sentences).toHaveLength(2)
    })
})