import Sentence from "../../../../src/TextRank/domain/Sentence"
import Word from "../../../../src/TextRank/domain/Word"
import Text from "../../../../src/TextRank/domain/Text"
import DefaultTextParser from "../../../../src/TextRank/domain/DefaultTextParser"

describe("Text parsing", () => {
    it("should create a single Sentence from a one-line text", () => {
        const text = "Hola, buenos días Cómo estás esta mañana?"
        const expectedSentences = [
            new Sentence(
                "Hola, buenos días Cómo estás esta mañana",
                [
                    new Word("Hola"),
                    new Word("buenos"),
                    new Word("días"),
                    //new Word("Cómo"), //stopword
                    new Word("estás"),
                    new Word("esta"),
                    new Word("mañana"),
                ],
                1
            ),
        ]
        const expectedText = new Text(text, expectedSentences)
        const actual = new DefaultTextParser().parse(text, "es")
        //console.log(`${text} => ${actual.getNormialized()}`);

        expect(actual.raw).toStrictEqual(text)
        expect(actual.sentences).toHaveLength(1)
        expect(actual).toStrictEqual(expectedText)
        expect(actual.sentences[0].raw).toStrictEqual("Hola, buenos días Cómo estás esta mañana")
        expect(actual.sentences[0].getNormalized()).toStrictEqual("hola buenos dias estas esta manana")
    })

    it("should create the right number of sentences", () => {
        const text = `
        What is Hexagonal Architecture? Hexagonal Architecture defines conceptual layers of code responsibility, and then points out ways to decouple code between those layers. It's helped clarify when, how and why we use interfaces (among other ideas).

        Hexagonal Architecture is NOT a new way to think about programming within a framework. Instead, if's a way of describing "best practices" - practices that are both old and new. I use quotes because that's a bit of a loaded phrase. Best practices for me might not be best practices for you - it depends on what technical circles we engage in.        
        `

        const actual = new DefaultTextParser().parse(text, "en")
        //console.log(`${JSON.stringify(actual)}`);

        expect(actual.sentences).toHaveLength(7)
    })
})
