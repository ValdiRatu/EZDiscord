import { CharStreams, CommonTokenStream } from 'antlr4ts';
import fs from 'node:fs';
import path from 'node:path';
import { ParserToASTConverter } from '../../src/ast/ParserToASTConverter';
import { EvaluateVisitor } from '../../src/ast/visitors/EvaluateVisitor';
import { EZDiscordLexer } from '../../src/parser/EZDiscordLexer';
import { EZDiscordParser } from '../../src/parser/EZDiscordParser';

// test input
const testInput = fs.readFileSync(path.resolve("spec/testInput.txt")).toString();

const charStream = CharStreams.fromString(testInput);
const lexer = new EZDiscordLexer(charStream);
const tokenStream = new CommonTokenStream(lexer);
const parser = new EZDiscordParser(tokenStream);

const tree = parser.bot();

const astConverter = new ParserToASTConverter();
const bot = astConverter.visit(tree);

const evaluator = new EvaluateVisitor();
bot.accept(evaluator, undefined);