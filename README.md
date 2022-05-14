[![Tests](https://github.com/NachoBrito/ts-textrank/actions/workflows/tests.yml/badge.svg)](https://github.com/NachoBrito/ts-textrank/actions/workflows/tests.yml)

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

//How do you want summary sentences to be sorted?
//Get sentences in the order that they appear in text:
const sorting = SORT_BY.OCCURRENCE
//Or sort them by relevance:
//const sorting = SORT_BY.SCORE
const config = new RelativeSummarizerConfig(ratio, sim, parser, d, sorting)

//Or, if you want a fixed number of sentences:
//const number = 5
//const config = new AbsoluteSummarizerConfig(number, sim, parser, d, sorting)    

const summarizer = new Summarizer(config, logger)

//Language is used for stopword removal.
//See https://github.com/fergiemcdowall/stopword for supported languages
const lang = "en"

const text = "...Text to summarize..."
//summary will be an array of sentences summarizing text
const summary = summarizer.summarize(text, lang)
```    

## How it works

TextRank algorithm was introduced by Rada Mihalcea and Paul Tarau in their paper "[TextRank: Bringing Order into Texts](https://aclanthology.org/W04-3252/)" in 2004. It applies the same principle that Google's PageRank used to discover relevant web pages.

The idea is to split a text into sentences, and then calculate a score for each sentence in terms of its similarity to the other sentences. TextRank treats sentences having common words as a link between them (like hyperlinks between web pages). Then, it applies a weight to that link based on how many words the sentences have in common. ts-textrank uses [Sorensen-Dice Similarity](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) for this.

The sentences with the higher score will be those that share the most words with the rest and can be used as a summary of the whole text.

### Damping factor

Original PageRank algorithm included a damping factor to represent the probability of a user clicking random links on a page. In this context, the authors have kept it and fixed it to a value of .85, but it can be modified if needed for better results in specific cases.
