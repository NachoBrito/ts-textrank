import stopword from "stopword";
import Sentence from "./Sentence";
import SentenceFactory from "./SentenceFactory";
import Word from "./Word";

export default class DefaultSentenceFactory implements SentenceFactory {


    /**
     * 
     * @param sentence 
     */
    create(sentence: string, language:string): Sentence {
        const tokens = this.tokenize(sentence);
        const words: Word[] = tokens.map(t => new Word(t));
        const filtered = this.filter(words, language);
        return new Sentence(filtered);
    }


    /**
     * 
     * @param words 
     * @param language 
     * @returns 
     */
    private filter(words:Word[], language:string):Word[]
    {
        //@ts-ignore
        let stop = stopword[language];
        
        return words.filter(w => {
            return !stop.includes(w.normalized) && !stop.includes(w.word)
        });
    }

    /**
     * 
     * @param sentence 
     * @returns 
     */
    private tokenize(sentence: string): string[] {
        const parts =
            sentence
                //remove all non-words 
                .replace(/[^\p{L}\s]/gu, "")
                //collapse multiple spaces
                .replace(/\s+/g, " ")
                //split by space
                .split(" ");
        return parts;
    }
} 