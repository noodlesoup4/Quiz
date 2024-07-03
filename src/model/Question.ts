 class Question {
    question: string;
    answers: string[];
    correctAnswer: string;
  
    constructor(question: string, answers: string[], correctAnswer: string) {
      this.question = question;
      this.answers = answers;
      this.correctAnswer = correctAnswer;
    }
  }

  export default Question;