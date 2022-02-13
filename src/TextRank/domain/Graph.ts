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
        const sentences = this.text.sentences;
        const total = sentences.length;
        const result:number[][] = []

        for(let i = 0; i < total; i++)
        {
            result[i] = Array<number>(total).fill(0)
            for(let j=0;j<total;j++)
            {
                if(i === j)
                {
                    //diagonal
                    result[i][j] = 1;
                }
                else if(i > j)
                {
                    //matrix is symmetric
                    result[i][j] = result[j][i]
                }
                else{
                    result[i][j] = similarityFunction.getSimilarity(sentences[i], sentences[j]);
                }
            }
        }
        return result;
    }
}