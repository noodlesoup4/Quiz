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

    /**
     * Get the JSON files from all specified category paths and return a shuffled array of objects containing all questions.
     * @param categories 
     * @returns Shuffled array of objects with all questions.
     */
    private readQuestions(categories: string[]): any[] {
        let allQuestions: any[] = [];


        for (const category of categories) {
            const questions = this.categories[category] || [];
            allQuestions = allQuestions.concat(questions);
        }


        return _.shuffle(allQuestions);
    }

    /**
     * 
     * @param categories Array containing objects of questions from the corresponding category.
     * @param amount Total amount of questions asked from all categories specified in the category array.
     * @returns Returns a section of the question array.
     */
    public getQuestions(categories: string[], amount: number): any[] {
        const questions = this.readQuestions(categories);
        return questions.slice(0, amount);
    }
}

export default new QuestionController();
