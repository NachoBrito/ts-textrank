import Summarizer, { SORT_BY } from "../../../../src/TextRank/application/Summarizer";
import {AbsoluteSummarizerConfig} from "../../../../src";
import SorensenDiceSimilarity from '../../../../src/TextRank/domain/SorensenDiceSimilarity';
import DefaultTextParser from '../../../../src/TextRank/domain/DefaultTextParser';
import NullLogger from '../../../../src/TextRank/infrastructure/NullLogger';

describe("Summarizer", () => {
    it("Should summarize text", () => {
        const txt=`Este texto con 1.200 tiene dos frases. No tres.`
        
        const sim = new SorensenDiceSimilarity()
        const parser = new DefaultTextParser()
        const config = new AbsoluteSummarizerConfig(5,sim,parser,.85,SORT_BY.SCORE)
        const logger = new NullLogger()
        const summarizer = new Summarizer(config, logger)

        const sentences = summarizer.summarize(txt, 'es')

        //console.log(sentences)

        expect(sentences).toHaveLength(2)
    })
})