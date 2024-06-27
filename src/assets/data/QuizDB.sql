CREATE TABLE quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL,
    wrong_answer1 TEXT NOT NULL,
    wrong_answer2 TEXT NOT NULL,
    wrong_answer3 TEXT NOT NULL,
    wrong_answer4 TEXT NOT NULL,
    
);

INSERT INTO quiz_questions (category, question, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3, wrong_answer4) VALUES
('Allgemein', 'Wie viele Kontinente gibt es auf der Erde?', '7', '5', '6', '8', '9'),
('Allgemein', 'Welche Farbe hat der Himmel an einem klaren Tag?', 'Blau', 'Grün', 'Rot', 'Gelb', 'Orange'),
('Allgemein', 'Was ist die Hauptstadt von Frankreich?', 'Paris', 'Berlin', 'Madrid', 'Rom', 'London'),
('Allgemein', 'Wie viele Planeten gibt es im Sonnensystem?', '8', '7', '9', '10', '11'),
('Allgemein', 'Welches Element hat das chemische Symbol ''O''?', 'Sauerstoff', 'Gold', 'Silber', 'Eisen', 'Wasserstoff'),
('Allgemein', 'Wer malte die Mona Lisa?', 'Leonardo da Vinci', 'Vincent van Gogh', 'Claude Monet', 'Pablo Picasso', 'Michelangelo'),
('Allgemein', 'In welchem Jahr begann der Zweite Weltkrieg?', '1939', '1914', '1945', '1963', '1989'),
('Allgemein', 'Wie viele Ringe sind im Logo der Olympischen Spiele zu sehen?', '5', '4', '6', '7', '8'),
('Allgemein', 'Welcher Planet ist der größte in unserem Sonnensystem?', 'Jupiter', 'Erde', 'Mars', 'Saturn', 'Venus'),
('Allgemein', 'Wer schrieb das Theaterstück ''Romeo und Julia''?', 'William Shakespeare', 'Friedrich Schiller', 'Johann Wolfgang von Goethe', 'Thomas Mann', 'Christopher Marlowe');

INSERT INTO quiz_questions (category, question, correct_answer, wrong_answer1, wrong_answer2, wrong_answer3) VALUES
('Tiere', "Welches Tier kann seine Größe verdreifachen, um sich vor Feinden zu schützen?", "Der Kugelfisch", "Der Tintenfisch", "Der Wal", "Der Hai"),
('Tiere', "Welches Tier hat 3 Herzen?", "Der Krake", "Der Wal", "Der Tintenfisch", "Der Seestern"),
('Tiere', "Welches Tier hat einen Schwanz, der giftig ist?", "Der Skorpion", "Die Schlange", "Der Salamander", "Die Eidechse"),
('Tiere', "Welches Säugetier kann nicht springen?", "Der Elefant", "Das Nashorn", "Das Nilpferd", "Der Büffel"),
('Tiere', "Was ist das stärkste Insekt der Welt?", "Der Mistkäfer", "Die Ameise", "Der Käfer", "Die Biene"),
('Tiere', "Welches Säugetier kann fliegen?", "Die Fledermaus", "Das Flughörnchen", "Der Flughund", "Der Lemur"),
('Tiere', "Welches Tier ist das größte der Welt?", "Der Blauwal", "Der Elefant", "Der Weiße Hai", "Der Pottwal"),
('Tiere', "Welches Tier kann im Winterschlaf seine Herzfrequenz auf 5 Schläge pro Minute reduzieren?", "Der Igel", "Der Bär", "Das Murmeltier", "Das Eichhörnchen"),
('Tiere', "Welches Tier kann sich mit der Zunge die Augen reiben?", "Die Giraffe", "Der Affe", "Der Elefant", "Der Ochse"),
('Tiere', "Welches Tier kann seine Augen unabhängig voneinander bewegen?", "Das Chamäleon", "Der Tintenfisch", "Der Frosch", "Der Gecko"),
('Tiere', "Welches Tier hat Fingerabdrücke, die denen des Menschen sehr ähnlich sind?", "Der Koala", "Der Schimpanse", "Der Gorilla", "Der Orang-Utan"),
('Tiere', "Welcher Meeressäuger wird im Alter rosafarben?", "Der Amazonas Delfin", "Der Wal", "Der Delfin", "Der Seelöwe"),
('Tiere', "Was ist das kleinste Vogelei der Welt?", "Das Ei des Kolibris", "Das Ei des Sperlings", "Das Ei der Taube", "Das Ei des Zaunkönigs"),
('Tiere', "Welche Schlange ist die giftigste der Welt?", "Der Inland-Taipan", "Die Kobra", "Die Klapperschlange", "Die Mamba"),
('Tiere', "Welches Insekt kann den Kopf nicht drehen?", "Die Ameise", "Die Biene", "Der Käfer", "Die Fliege"),
('Tiere', "Welches Tier ist für seine schwarzen und weißen Streifen bekannt?", "Das Zebra", "Der Tiger", "Das Stinktier", "Der Dachs"),
('Tiere', "Welches Tier kann nahezu sein gesamtes Leben kopfüber verbringen?", "Das Faultier", "Der Affe", "Der Lemur", "Der Flughund"),
('Tiere', "Welches Säugetier legt Eier?", "Das Schnabeltier", "Der Ameisenigel", "Der Igel", "Der Maulwurf"),
('Tiere', "Welches Tier bringt seinem ungeborenen Nachwuchs bereits Laute bei?", "Das Huhn", "Der Papagei", "Der Delfin", "Der Wal"),
('Tiere', "Welches Tier kann seinen eigenen Namen rufen?", "Der Papagei", "Der Hund", "Die Katze", "Der Delfin"),
('Tiere', "Welches Tier kann seine Farbe je nach Stimmung ändern?", "Der Tintenfisch", "Das Chamäleon", "Der Frosch", "Die Krabbe"),
('Tiere', "Welches Tier lächelt dauerhaft?", "Das Quokka", "Der Delfin", "Der Panda", "Das Meerschweinchen"),
('Tiere', "Welches Tier hat unter seinem weißen Fell eine schwarze Haut?", "Der Eisbär", "Der Pinguin", "Der Seebär", "Der Orca"),
('Tiere', "Welches Tier hat die meisten Beine?", "Der Tausendfüßer", "Der Hundertfüßer", "Die Spinne", "Der Käfer");