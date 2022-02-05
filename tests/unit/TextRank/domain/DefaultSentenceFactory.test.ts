import Sentence from '../../../../src/TextRank/domain/Sentence';
import Word from '../../../../src/TextRank/domain/Word';
import DefaultSentenceFactory from '../../../../src/TextRank/domain/DefaultSentenceFactory';

describe('Sentence creation', () => {
    it('should create sentence models from strings', () => {
        const text = "Hola, buenos días ¿Cómo estás esta mañana? yo bien.";
        const expected = new Sentence([
            new Word("Hola"), 
            new Word("buenos"), 
            new Word("días"),
            //new Word("Cómo"), //stopword
            new Word("estás"),
            new Word("esta"),
            new Word("mañana"),
            new Word("yo"),
            new Word("bien"),
        ]);

        const actual = new DefaultSentenceFactory().create(text, 'es');
        //console.log(`${text} => ${actual.getNormialized()}`);

        expect(actual).toStrictEqual(expected);
        expect(actual.getNormialized()).toStrictEqual("hola buenos dias estas esta manana yo bien");
    });
});