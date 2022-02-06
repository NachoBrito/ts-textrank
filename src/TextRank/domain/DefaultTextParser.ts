import stopword from "stopword";
import Sentence from "./Sentence";
import TextParser from "./TextParser";
import Word from "./Word";
import Text from "./Text";

export default class DefaultTextParser implements TextParser {


    /**
     * 
     * @param sentence 
     */
    parse(text: string, language: string): Text {
        const rx = /[^\.!\?]+[\.!\?]+/g
        let result, rawSentence, limiter;
        const sentences: Sentence[] = [];
        while ((result = rx.exec(text)) !== null) {
            rawSentence = result[0].trim();            
            sentences.push(this.buildSentence(rawSentence, language));
        }
        return new Text(text, sentences);
    }

    /**
     * 
     * @param raw 
     * @param limiter 
     * @param language 
     * @returns the sentence model
     */
    private buildSentence(raw: string, language: string): Sentence {
        const tokens = this.tokenize(raw);
        const words: Word[] = tokens.map(t => new Word(t));
        const filtered = this.filter(words, language);

        return new Sentence(raw, filtered);
    }

    /**
     * removes stopwords
     * @param words 
     * @param language 
     * @returns the filtered list
     */
    private filter(words: Word[], language: string): Word[] {
        //@ts-ignore
        let stop = stopword[language];

        return words.filter(w => {
            return !stop.includes(w.normalized) && !stop.includes(w.word)
        });
    }

    /**
     * 
     * @param sentence 
     * @returns the list of tokens of a sentence
     */
    private tokenize(sentence: string): string[] {
        const parts =
            sentence
                //remove all non-word 
                .replace(/[^\p{L}\s]/gu, "")
                //collapse multiple spaces
                .replace(/\s+/g, " ")
                //split by space
                .split(" ");
        return parts;
    }
} 