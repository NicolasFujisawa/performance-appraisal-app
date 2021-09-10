INSERT INTO teacher (teacherId, name) values (1, 'Teacher A');
INSERT INTO team (teamId, name, teacher_id) values (1, 'Team A', 1);
INSERT INTO method (methodId, name, teacher_id) values (1, 'Method A', 1);

INSERT INTO student (studentId, name, ra) values (1, 'Student A', '222');
INSERT INTO student (studentId, name, ra) values (2, 'Student B', '111');

INSERT INTO criteria (criteriaId, name, method_id) values (1, 'Proatividade', 1);

INSERT INTO criteria_score (criteria_scoreId, criteria_id, name, value) values (1, 1, 'Proativo', 3);
INSERT INTO criteria_score (criteria_scoreId, criteria_id, name, value) values (2, 1, 'Folgado', 0);
