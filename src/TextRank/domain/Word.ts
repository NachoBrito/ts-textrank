import { transliterate as tr, slugify } from "transliteration";

export default class Word
{
    readonly word: string;
    readonly normalized: string;

    constructor(word:string){
        this.word = word;
        this.normalized = tr(word).toLocaleLowerCase();
    }    
}