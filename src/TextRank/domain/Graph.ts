import SentenceSimilarity from "./SentenceSimilarity";
import Text from "./Text";

export default class Graph {
    readonly text:Text;
    readonly weights:number[][];

    constructor(text:Text, similarityFunction:SentenceSimilarity)
    {
        this.text = text;
        this.weights = this.calculateWeights(similarityFunction);
    }
    
    /**
     * 
     * @param similarityFunction 
     * @returns 
     */
    private calculateWeights(similarityFunction: SentenceSimilarity): number[][] {
        const result:number[][] = [];
        const sentences = this.text.sentences;
        const total = sentences.length;
        for(let i = 0; i < total; i++)
        {
            result[i] = []
            for(let j=0;j<total;j++)
            {
                if(i === j)
                {
                    result[i][j] = 1;
                }
                else{
                    result[i][j] = similarityFunction.getSimilarity(sentences[i], sentences[j]);
                }
            }
        }
        return result;
    }
}