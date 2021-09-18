INSERT INTO teacher (teacher_id, name) values (1, 'Teacher A');
INSERT INTO team (team_id, name, teacher_id) values (1, 'Team A', 1);
INSERT INTO method (method_id, name, teacher_id) values (1, 'Method A', 1);

INSERT INTO student (student_id, name, ra) values (1, 'Student A', '222');
INSERT INTO student (student_id, name, ra) values (2, 'Student B', '111');

INSERT INTO criteria (criteria_id, name, method_id) values (1, 'Proatividade', 1);
INSERT INTO criteria (criteria_id, name, method_id) values (2, 'Autonomia', 1);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (1, 1, 'Proativo', 3);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (2, 1, 'Folgado', 0);

INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (3, 2, 'Autonomo', 3);
INSERT INTO criteria_score (criteria_score_id, criteria_id, name, value) values (4, 2, 'CLT', 0);

INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (1, 1, 1);
INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (2, 2, 1);

insert into evaluation ("start", "end", "isLastEvaluation", "method_id", "teamTeamId") values ('2021-09-17', '2021-10-17', false, 1, 1);

insert into score (evaluated_student_id, evaluator_student_id, criteria_score_id, evaluation_id) values (1, 2, 1, 1);
insert into score (evaluated_student_id, evaluator_student_id, criteria_score_id, evaluation_id) values (1, 2, 2, 1);
insert into score (evaluated_student_id, evaluator_student_id, criteria_score_id, evaluation_id) values (2, 1, 2, 1);
