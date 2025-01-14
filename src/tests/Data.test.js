import '@testing-library/jest-dom';
import { _saveQuestion } from '../utils/_DATA';

describe("Test for _DATA.js functions", () => {

    test("_saveQuestion() returns formatted question when correct data is provided", async () => {
        const question = {
            optionOneText: 'First option',
            optionTwoText: 'Second option',
            author: 'mtsamis'
        };
        const formattedQuestion = await _saveQuestion(question);

        expect(formattedQuestion).toBeDefined();
        expect(formattedQuestion.id).not.toBeNull();
        expect(formattedQuestion.timestamp).toBeGreaterThan(0);
        expect(formattedQuestion.author).toEqual(question.author);
        expect(formattedQuestion.optionOne.votes).toEqual([]);
        expect(formattedQuestion.optionOne.text).toEqual(question.optionOneText);
        expect(formattedQuestion.optionTwo.votes).toEqual([]);
        expect(formattedQuestion.optionTwo.text).toEqual(question.optionTwoText);
    });

    test("_saveQuestion() returns an error when incorrect data is provided", async () => {
        const question = {
            optionOneText: 'First option'
        };
        await expect(_saveQuestion(question)).rejects.toMatch("Please provide optionOneText, optionTwoText, and author");
    });

});
