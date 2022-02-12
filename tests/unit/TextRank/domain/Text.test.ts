import Sentence from "../../../../src/TextRank/domain/Sentence";
import Word from "../../../../src/TextRank/domain/Word";
import Text from "../../../../src/TextRank/domain/Text";

describe("Text", () => {
    it("should normalize text", () => {
        const raw = "Hola, buenos días ¿Cómo estás esta mañana? Voy a comprar el pan";
        const sentences = [new Sentence('Hola, buenos días ¿Cómo estás esta mañana?', [
            new Word("Hola"), 
            new Word("buenos"), 
            new Word("días"),
            //new Word("Cómo"), //stopword
            new Word("estás"),
            new Word("esta"),
            new Word("mañana")
        ],1),new Sentence('Voy a comprar el pan', [
            new Word("Voy"), 
            new Word("comprar"), 
            new Word("pan")
        ],2)];
        const expectedNormalized = "hola buenos dias estas esta manana\nvoy comprar pan"
        const text = new Text(raw, sentences);

        expect(text.getNormalized()).toStrictEqual(expectedNormalized)
    })
})