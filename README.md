# ts-textrank

ts-textrank is a Typescript implementation of the TextRank algorithm. 

## Install

Using npm:
```bash
$ npm install ts-textrank
```

Using yarn:

```bash
$ yarn add ts-textrank
```

## Usage

- Create a config object
- Create a summarizer with your config
- Call summarizer.summarize to extract most relevant senteces from an input text

```js
    import { SorensenDiceSimilarity, DefaultTextParser, ConsoleLogger, RelativeSummarizerConfig, Summarizer, NullLogger, Sentence } from "ts-textrank";

    //Only one similarity function implemented at this moment.
    //More could come in future versions.
    const sim = new SorensenDiceSimilarity()

    //Only one text parser available a this moment
    const parser = new DefaultTextParser()

    //Do you want logging?
    const logger = new ConsoleLogger()

    //You can implement LoggerInterface for different behavior,
    //or if you don't want logging, use this:
    //const logger = new NullLogger()

    //Set the summary length as a percentage of full text length
    const ratio = .25 

    //Damping factor. See "How it works" for more info.
    const d = .85

    //How do you want summary sentences to be sorte?
    //Get sentences in the order that they appear in text:
    const sorting = Summarizer.SORT_OCCURENCE

    //Or, sort by relevance:
    //const sorting = Summarizer.static SORT_SCORE
    const config = new RelativeSummarizerConfig(ratio, sim, parser, d, sorting)

    //Or, if you want a fixed number of sentences:
    //const number = 5
    //const config = new AbsoluteSummarizerConfig(number, sim, parser, d, sorting)    

    const summarizer = new Summarizer(config, logger)

    //summary will be an array of sentences summarizing text
    const text = "...Text to summarize..."

    //See [fergiemcdowall/stopword](https://github.com/fergiemcdowall/stopword) for supported languages
    const lang = "en"

    const summary = summarizer.summarize(text, lang)
```    

## How it works
