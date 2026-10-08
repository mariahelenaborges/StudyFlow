INSERT INTO CadastroEstudantes (nome, email, curso, createdAt, updatedAt)
VALUES ('Havana Queen Linda', 'exemplo@gmail.com', 'Programação', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Atividades (nome, materia, tipo, entrega, estudanteId, createdAt, updatedAt)
VALUES ('Prova de filosofia', 'Filosofia', 'Prova', '2026-06-27', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Atividades (nome, materia, tipo, entrega, estudanteId, createdAt, updatedAt)
VALUES ('Exercicio de geo', 'Geografia', 'Atividade', '2026-06-12', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Atividades (nome, materia, tipo, entrega, estudanteId, createdAt, updatedAt)
VALUES ('Projeto de historia', 'Historia', 'Projeto/Trabalho', '2026-06-10', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Calendarios (titulo, descricao, data, horario, estudanteId, createdAt, updatedAt)
VALUES ('Estudar para a prova', 'Revisão de filosofia', '2026-06-25', '14:00', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
