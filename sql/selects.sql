SELECT * FROM Atividades;


SELECT * FROM Atividades
ORDER BY entrega ASC;


SELECT * FROM Atividades
WHERE tipo = 'Prova';

SELECT e.nome AS estudante, a.nome AS tarefa, a.entrega
FROM Atividades a
JOIN CadastroEstudantes e ON e.id = a.estudanteId
ORDER BY a.entrega ASC;

SELECT e.nome AS estudante, c.titulo, c.data, c.horario
FROM Calendarios c
JOIN CadastroEstudantes e ON e.id = c.estudanteId
ORDER BY c.data ASC;
