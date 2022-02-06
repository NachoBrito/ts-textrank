import Sentence from '../../../../src/TextRank/domain/Sentence';
import Word from '../../../../src/TextRank/domain/Word';
import SorensenDiceSimilarity from '../../../../src/TextRank/domain/SorensenDiceSimilarity';

describe('Sentence similarity calculation', () => {
    it('should return 1.0 for equivalent sentences', () => {
        const s1 = new Sentence("Hello New World",[
            new Word("hello"), new Word("New"), new Word("World")
        ]);
        const s2 = new Sentence("World new Hello",[
            new Word("World"),new Word("new"),new Word("Hello")
        ]);
        
        const sim = new SorensenDiceSimilarity().getSimilarity(s1,s2);
        expect(sim).toStrictEqual(1.0);
    })

    it('should return 0 for different sentences', () => {
        const s1 = new Sentence("Hello New World",[
            new Word("hello"), new Word("New"), new Word("World")
        ]);
        const s2 = new Sentence("Different content found",[
            new Word("Different"),new Word("content"),new Word("found")
        ]);
        
        const sim = new SorensenDiceSimilarity().getSimilarity(s1,s2);
        expect(sim).toStrictEqual(0);
    }) 
    
    it('should return 0 if both of the sentences is empty', () => {
        const s1 = new Sentence("",[]);
        const s2 = new Sentence("",[]);
        
        const sim = new SorensenDiceSimilarity().getSimilarity(s1,s2);
        expect(sim).toStrictEqual(0);
    })    
})