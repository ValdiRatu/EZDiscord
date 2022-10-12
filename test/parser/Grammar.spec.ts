import { expect } from 'chai';
import TestUtil, { TestGrammar } from '../TestUtil';
import { CharStreams, CodePointCharStream, CommonTokenStream, ConsoleErrorListener } from 'antlr4ts';
import { EZDiscordLexer } from '../../src/parser/EZDiscordLexer';
import Log from '../../src/util/Log';
import { EZDiscordParser } from '../../src/parser/EZDiscordParser';

describe('Parser Grammar Rules test', function () {
	let testGrammarFiles: TestGrammar[] = [];

	before(function () {
		Log.test(`Before ${this?.test?.parent.title}`);
		try {
			testGrammarFiles = TestUtil.readTestGrammarFiles();
		} catch (err) {
			expect.fail('', '', `Failed to read one or more test queries. ${err}`);
		}
	});

	beforeEach(function () {
		Log.test(`BeforeTest: ${this.currentTest.title}`);
	});

	after(function () {
		Log.test(`After: ${this.test.parent.title}`);
	});

	afterEach(function () {
		Log.test(`AfterTest: ${this.currentTest.title}`);
	});

	it('Should run grammar tests', function () {
		describe('Dynamic tests Grammar.spec.ts: ', function () {
			for (const test of testGrammarFiles) {
				it(`[${test.filename}] ${test.title}`, function () {
					let charStream: CodePointCharStream;
					let lexer: EZDiscordLexer;
					let tokenStream: CommonTokenStream;
					let parser: EZDiscordParser;
					try {
						charStream = CharStreams.fromString(test.inputString);
						lexer = new EZDiscordLexer(charStream);
						tokenStream = new CommonTokenStream(lexer);
						parser = new EZDiscordParser(tokenStream);
						// Comment out to see Antlr parser errors
						parser.removeErrorListeners();
						// Comment out to see Antlr lexer errors
						lexer.removeErrorListener(ConsoleErrorListener.INSTANCE);

						const tree = parser.bot();
					} catch (err: any) {
						expect.fail(`Failed to tokenize for ${test.filename}`);
					}
					if (test.isValid) {
						expect(parser.numberOfSyntaxErrors).to.equal(0);
					} else {
						expect(parser.numberOfSyntaxErrors).to.be.greaterThan(0);
					}
				});
			}
		});
	});
});
