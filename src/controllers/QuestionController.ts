import { router } from 'expo-router';
import Question from '../model/Question';
import chemistryQuestions from '../model/data/chemistry/chemistry.json';
import geographyQuestions from '../model/data/geography/geography.json';
import historyQuestions from '../model/data/history/history.json';
import natureQuestions from '../model/data/nature/nature.json';
import physicsQuestions from '../model/data/physics/physics.json';
import politicsQuestions from '../model/data/politics/politics.json';
import religionQuestions from '../model/data/religion/religion.json';
import _ from 'lodash';

class QuestionController{
    private categories: any = {
        'chemie': chemistryQuestions,
        'geographie': geographyQuestions,
        'geschichte': historyQuestions,
        'natur': natureQuestions,
        'physik': physicsQuestions,
        'politik': politicsQuestions,
        'religion': religionQuestions
    };

    private questions: Question[] = [];

    /**
     * Get the JSON files from all specified category paths and return a shuffled array of objects containing all questions.
     * @param categories 
     * @returns Shuffled array of objects with all questions.
     */
    private readQuestions(categories: string[]): Question[] {
        let allQuestions: Question[] = [];


        for (const category of categories) {
            this.questions = this.categories[category] || [];
            allQuestions = allQuestions.concat(this.questions);
        }


        return _.shuffle(allQuestions); // _ is convention to replace lodash. Code without _ : lodash.shuffle(allQuestions)
    }

    /**
     * 
     * @param categories Array containing objects of questions from the given category.
     * @param amount Total amount of questions asked from all categories specified in the category array.
     * @returns Returns a section of the question array.
     */
    public getQuestions(categories: string[], amount: number): Question[] {
        const questions = this.readQuestions(categories);
        return questions.slice(0, amount);
    }

    

    /**
     * End the quiz.
     * @param score The current score of the quiz.
     * @param total The total number of questions.
     * @param mode The current mode (Normal, Survival, Custom)
     */
    public endQuiz(score: number, total: number, mode: string): void {
        if (mode ==='Normal' || mode === 'Survival' || mode === 'Custom') {
            router.push({ pathname: 'EvaluationScreen', params: { score, total, mode } });
        } else {
            console.error('Error, no game mode recognized.');
        }
    }


}

export default new QuestionController();
