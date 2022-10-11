import * as fs from "fs";
import Log from "../src/util/Log";
import { expect } from "chai";
import { PassThrough } from "stream";
import { CommonTokenStream } from 'antlr4ts';

export interface TestGrammar {
    title: string;
    inputString: string;
    isValid: boolean;
    result: any;
    filename: string;
}

export default class TestUtil {
    /**
     * Recursively searches for test query JSON files in the path and returns those matching the specified schema.
     * @param path The path to the sample query JSON files.
     */
    public static readTestGrammarFiles(path: string = "test/parser/resources/"): TestGrammar[] {
        const methodName: string = "TestUtil::readTestGrammarFiles --";
        const testQueries: TestGrammar[] = [];
        let files: string[];

        try {
            files = TestUtil.readAllFiles(path);
            if (files.length === 0) {
                Log.warn(`${methodName} No query files found in ${path}.`);
            }
        } catch (err) {
            Log.error(`${methodName} Exception reading files in ${path}.`);
            throw err;
        }

        for (const file of files) {
            const skipFile: string = file.replace(__dirname, "test");
            let content: Buffer;

            try {
                content = fs.readFileSync(file);
            } catch (err) {
                Log.error(`${methodName} Could not read ${skipFile}.`);
                throw err;
            }

            try {
                const query = JSON.parse(content.toString());
                TestUtil.validate(query, {
                    title: "string",
                    inputString: "string",
                    isValid: "boolean",
                    result: null,
                });
                query["filename"] = file;
                testQueries.push(query);
            } catch (err: any) {
                Log.error(
                    `${methodName} ${skipFile} does not conform to the query schema.`,
                );
                throw new Error(`In ${file} ${err.message}`);
            }
        }

        return testQueries;
    }

    private static readAllFiles(currentPath: string): string[] {
        let filePaths: string[] = [];
        const filesInDir = TestUtil.attemptDirRead(currentPath);
        for (const fileOrDirName of filesInDir) {
            const fullPath = `${currentPath}/${fileOrDirName}`;
            if (TestUtil.isDirectory(fullPath)) {
                filePaths = filePaths.concat(TestUtil.readAllFiles(fullPath));
            } else if (fileOrDirName.endsWith(".json")) {
                filePaths.push(fullPath);
            }
        }
        return filePaths;
    }

    private static attemptDirRead(currentPath: string): string[] {
        try {
            return fs.readdirSync(currentPath);
        } catch (err) {
            Log.error(`Error reading directory ${currentPath}`);
            throw err;
        }
    }

    // From https://stackoverflow.com/questions/15630770/node-js-check-if-path-is-file-or-directory
    private static isDirectory(path: string) {
        try {
            const stat = fs.lstatSync(path);
            return stat.isDirectory();
        } catch (e) {
            return false;
        }
    }

    private static validate(content: any, schema: { [key: string]: string }) {
        for (const [property, type] of Object.entries(schema)) {
            if (!content.hasOwnProperty(property)) {
                throw new Error(`required property ${property} is missing.`);
            } else if (type !== null && typeof content[property] !== type) {
                throw new Error(
                    `the value of ${property} is not ${
                        type === "object" ? "an" : "a"
                    } ${type}.`,
                );
            }
        }
    }
}
