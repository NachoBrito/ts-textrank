import Summarizer from "../../../../src/TextRank/domain/Summarizer";
import {AbsoluteSummarizerConfig} from "../../../../src/TextRank/domain/SummarizerConfig";
import SorensenDiceSimilarity from '../../../../src/TextRank/domain/SorensenDiceSimilarity';
import DefaultTextParser from '../../../../src/TextRank/domain/DefaultTextParser';
import NullLogger from '../../../../src/TextRank/infraestructure/NullLogger';

describe("Summarizer", () => {
    it("Should summarize text", () => {
        const txt = `
        Graph-based ranking algorithms are essentially a
        way of deciding the importance of a vertex within
        a graph, based on global information recursively
        drawn from the entire graph. The basic idea implemented by a graph-based ranking model is that
        of “voting” or “recommendation”. When one vertex links to another one, it is basically casting a vote
        for that other vertex. The higher the number of votes
        that are cast for a vertex, the higher the importance
        of the vertex. Moreover, the importance of the vertex
        casting the vote determines how important the vote
        itself is, and this information is also taken into account by the ranking model. Hence, the score associated with a vertex is determined based on the votes
        that are cast for it, and the score of the vertices casting these votes        
        `
        const sim = new SorensenDiceSimilarity()
        const parser = new DefaultTextParser()
        const config = new AbsoluteSummarizerConfig(2,sim,parser,.85)
        const logger = new NullLogger()
        const summarizer = new Summarizer(config, logger)

        const sentences = summarizer.summarize(txt, 'en')

        //console.log(sentences)

        expect(sentences).toHaveLength(2)
    })
})