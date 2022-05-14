import Text from "./Text"

export default interface TextParser {
	parse(text: string, language: string): Text
}
