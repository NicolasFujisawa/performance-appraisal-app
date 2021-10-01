INSERT INTO teacher (teacher_id, name) values (1, 'Teacher A');
INSERT INTO team (team_id, name, teacher_id) values (1, 'Team A', 1);


INSERT INTO student (student_id, name, ra) values (1, 'Student A', '222');
INSERT INTO student (student_id, name, ra) values (2, 'Student B', '111');

INSERT INTO method (method_id, name, teacher_id) values (1, 'Method A', 1);

INSERT INTO criteria (criteria_id, name) values (1, 'Proatividade');
INSERT INTO criteria (criteria_id, name) values (2, 'Autonomia');

insert into method_criterias_criteria values (1, 1);
insert into method_criterias_criteria values (1, 2);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (1, 1, 'Proativo', 3);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (2, 1, 'Folgado', 0);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (3, 2, 'Autonomo', 3);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (4, 2, 'CLT', 0);

INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (1, 1, 1);
INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (2, 2, 1);


INSERT INTO method (method_id, name, teacher_id) values (2, 'Pacer', 1);

INSERT INTO criteria (criteria_id, name) values (3, 'Proatividade');
INSERT INTO criteria (criteria_id, name) values (4, 'Colaboração');
INSERT INTO criteria (criteria_id, name) values (5, 'Entrega de Resultados');

insert into method_criterias_criteria values (2, 3);
insert into method_criterias_criteria values (2, 4);
insert into method_criterias_criteria values (2, 5);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (5, 3, 'Reativo', 0);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (6, 3, 'Ativo', 1);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (7, 3, 'Proativo', 2);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (8, 4, 'Ausente', 0);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (9, 4, 'Coordenado', 1);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (10, 4, 'Colaborativo', 2);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (11, 5, 'Sem entregas', 0);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (12, 5, 'Entregas dúvidosas', 1);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (13, 5, 'Entregas Confiaveis', 2);
