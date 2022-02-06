import Sentence from "./Sentence";
import SentenceSimilarity from "./SentenceSimilarity";

export default class SorensenDiceSimilarity implements SentenceSimilarity{

    getSimilarity(s1: Sentence, s2: Sentence): number {
        if(s1.words.length === 0 && s2.words.length === 0){
            return 0;
        }

        const w1:string[] = s1.words.map(w => w.normalized);
        const w2:string[] = s2.words.map(w => w.normalized);
        let common = 0;
        const total = w1.length + w2.length;
        for(let i = 0; i < w1.length;i++)
        {
            if(w2.includes(w1[i]))
            {
                common++;
            }
        }

        const sd = 2 * common / total;
        return sd;
    }

}