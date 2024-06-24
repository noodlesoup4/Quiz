CREATE TABLE quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL
);