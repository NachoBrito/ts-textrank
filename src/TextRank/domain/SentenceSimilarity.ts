import Sentence from "./Sentence";

export default interface SentenceSimilarity {
    getSimilarity(s1:Sentence, s2:Sentence):number;
}