INSERT INTO teacher (teacher_id, name) VALUES (1, 'Teacher A');
INSERT INTO team (team_id, name, teacher_id) VALUES (1, 'Team A', 1);

INSERT INTO student (student_id, name, ra) VALUES (1, 'Student A', '222');
INSERT INTO student (student_id, name, ra) VALUES (2, 'Student B', '111');

INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (1, 1, 1);
INSERT INTO team_member (team_member_id, student_id, team_id) VALUES (2, 2, 1);
