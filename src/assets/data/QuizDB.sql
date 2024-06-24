CREATE TABLE quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer1 TEXT NOT NULL,
    answer2 TEXT NOT NULL,
    answer3 TEXT NOT NULL,
    answer4 TEXT NOT NULL,
    correct_answer TEXT NOT NULL
);

INSERT INTO quiz_questions (question, answer1, answer2, answer3, answer4, correct_answer) VALUES
('Wie viele Kontinente gibt es auf der Erde?', '5', '6', '7', '8', '7'),
('Welche Farbe hat der Himmel an einem klaren Tag?', 'Grün', 'Blau', 'Rot', 'Gelb', 'Blau'),
('Was ist die Hauptstadt von Frankreich?', 'Berlin', 'Madrid', 'Paris', 'Rom', 'Paris'),
('Wie viele Planeten gibt es im Sonnensystem?', '7', '8', '9', '10', '8'),
('Welches Element hat das chemische Symbol ''O''?', 'Gold', 'Silber', 'Sauerstoff', 'Eisen', 'Sauerstoff'),
('Wer malte die Mona Lisa?', 'Vincent van Gogh', 'Claude Monet', 'Pablo Picasso', 'Leonardo da Vinci', 'Leonardo da Vinci'),
('In welchem Jahr begann der Zweite Weltkrieg?', '1914', '1939', '1945', '1963', '1939'),
('Wie viele Ringe sind im Logo der Olympischen Spiele zu sehen?', '4', '5', '6', '7', '5'),
('Welcher Planet ist der größte in unserem Sonnensystem?', 'Erde', 'Mars', 'Jupiter', 'Saturn', 'Jupiter'),
('Wer schrieb das Theaterstück ''Romeo und Julia''?', 'Friedrich Schiller', 'Johann Wolfgang von Goethe', 'William Shakespeare', 'Thomas Mann', 'William Shakespeare');