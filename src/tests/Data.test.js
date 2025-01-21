import {_saveUser,
        _updateUser,
        _saveQuestion,
        _deleteQuestion,
        _saveQuestionAnswer} from '../utils/_DATA';

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

    test("_saveQuestion() returns an error when question already exists", async () => {
        const question = {
            author: 'mtsamis',
            optionOneText: 'Repeating option1',
            optionTwoText: 'Repeating option2'
        };
        await expect(_saveQuestion(question)).resolves.toBeDefined();
        await expect(_saveQuestion(question)).rejects.toMatch("Poll already exists");
    });

    test("_updateUser() returns updated user when correct data is provided", async () => {
        const user = {
            id: 'mtsamis',
            password:'xyz',
            name: 'Mike',
            avatarURL: null,
            answers: {
              "xj352vofupe1dqz9emx13r": 'optionOne',
            },
            questions: ['6ni6ok3ym7mf1p33lnez'],
          }
        const updatedUser = await _updateUser(user);

        expect(updatedUser).toBeDefined();
        expect(updatedUser.id).toEqual(user.id);
        expect(updatedUser.password).toEqual(user.password);
        expect(updatedUser.name).toEqual(user.name);
        expect(updatedUser.avatarURL).toEqual(user.avatarURL);
        expect(updatedUser.answers.lenght).toEqual(user.answers.lenght);
        expect(updatedUser.questions.lenght).toEqual(user.questions.lenght);
    });

    test("_updateUser() returns an error when incorrect data is provided", async () => {
        const user = {
            id: 'mtsamis',
          }
        const keys = ["id", "password", "name", "avatarURL", "answers", "questions"];
        await expect(_updateUser(user)).rejects.toMatch(`Please provide all User fields (${keys})`);
    });

    test("_deleteQuestion() returns updated questions object when correct data is provided", async () => {
        const id = "xj352vofupe1dqz9emx13r";
        const updatedQuestions = await _deleteQuestion(id);

        expect(updatedQuestions).toBeDefined();
        expect(Object.keys(updatedQuestions)).not.toContain(id);
    });

    test("_deleteQuestion() returns an error when incorrect data is provided", async () => {
        const id = null;
        await expect(_deleteQuestion(id)).rejects.toMatch("Please provide question's ID");
    });

    test("_saveQuestionAnswer() returns true when correct data is provided", async () => {
        const authedUser = 'mtsamis';
        const qid = "am8ehyc8byjqgar0jgpub9";
        const answer = "optionOne";
        const response = await _saveQuestionAnswer({authedUser, qid, answer});
        expect(response).toEqual(true);
    });

    test("_saveQuestionAnswer() returns an error when incorrect data is provided", async () => {
        const qid = "am8ehyc8byjqgar0jgpub9";
        const answer = "optionOne";
        await expect(_saveQuestionAnswer({qid, answer}))
            .rejects.toMatch("Please provide authedUser, qid, and answer");
    });

    test("_saveUser() returns an error when incorrect data is provided", async () => {
        const id = "j0hn";
        const password = "xyz987";
        await expect(_saveUser({id, password}))
            .rejects.toMatch("Please provide all User fields");
    });
    
    test("_saveUser() returns an error when user already exist", async () => {
        const id = "mtsamis";
        const name = "Mike Tsamis";
        const password = "xyz123";
        await expect(_saveUser({id, name, password}))
            .rejects.toMatch("Username already exists");
    });

});
