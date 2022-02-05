import Sentence from "./Sentence";

export default interface SentenceFactory {
    create(sentence: string, language: string): Sentence;
}