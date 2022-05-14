import Sentence from "../../../../src/TextRank/domain/Sentence"
import SorensenDiceSimilarity from "../../../../src/TextRank/domain/SorensenDiceSimilarity"
import Word from "../../../../src/TextRank/domain/Word"
import Graph from "../../../../src/TextRank/domain/Graph"
import Text from "../../../../src/TextRank/domain/Text"

describe("Graph", () => {
    it("Should build a graph and  calculate weights", () => {
        const raw = "Hello New World. And World new Hello"
        const s1 = new Sentence("Hello New World", [new Word("hello"), new Word("New"), new Word("World")], 1)
        const s2 = new Sentence(
            "And World new Hello",
            [new Word("And"), new Word("World"), new Word("new"), new Word("Hello")],
            2
        )
        const text = new Text(raw, [s1, s2])
        const sim = new SorensenDiceSimilarity()
        const expectedSim = sim.getSimilarity(s1, s2)

        const graph = new Graph(text, sim)

        expect(graph.weights).toHaveLength(2)
        expect(graph.weights[0]).toHaveLength(2)
        expect(graph.weights[1]).toHaveLength(2)

        //Main diagonal
        expect(graph.weights[0][0]).toStrictEqual(1)
        expect(graph.weights[1][1]).toStrictEqual(1)

        //i != j
        expect(graph.weights[0][1]).toBeLessThan(1)
        expect(graph.weights[1][0]).toBeLessThan(1)

        //symmetry
        expect(graph.weights[0][1]).toStrictEqual(graph.weights[1][0])

        expect(graph.weightSums).toHaveLength(2)
        expect(graph.weightSums[0]).toStrictEqual(graph.weights[0][0] + graph.weights[0][1])
        expect(graph.weightSums[1]).toStrictEqual(graph.weights[1][0] + graph.weights[1][1])
    })
})
