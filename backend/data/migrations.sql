INSERT INTO teacher (teacher_id, name) VALUES (1, 'Teacher A');
INSERT INTO team (team_id, name, teacher_id) VALUES (1, 'Team A', 1);

INSERT INTO student (student_id, name, ra) VALUES (1, 'Student A', '222');
INSERT INTO student (student_id, name, ra) VALUES (2, 'Student B', '111');

INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (1, 1, 1);
INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (2, 2, 1);

INSERT INTO method (method_id, name, teacher_id) VALUES (1, 'Pacer', 1);

INSERT INTO criteria (criteria_id, name) VALUES (1, 'Proatividade');
INSERT INTO criteria (criteria_id, name) VALUES (2, 'Colaboração');
INSERT INTO criteria (criteria_id, name) VALUES (3, 'Entrega de Resultados');

insert into method_criterias_criteria VALUES (1, 1);
insert into method_criterias_criteria VALUES (1, 2);
insert into method_criterias_criteria VALUES (1, 3);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (1, 1, 'Reativo', 0);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (2, 1, 'Ativo', 1);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (3, 1, 'Proativo', 2);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (4, 2, 'Ausente', 0);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (5, 2, 'Coordenado', 1);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (6, 2, 'Colaborativo', 2);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (7, 3, 'Sem entregas', 0);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (8, 3, 'Entregas dúvidosas', 1);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) VALUES (9, 3, 'Entregas Confiaveis', 2);
