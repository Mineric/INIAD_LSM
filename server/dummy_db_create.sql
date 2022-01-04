INSERT INTO api_school (school_name, school_description)
VALUES ("Toyo University", "Is very nice");


INSERT INTO api_course 
(course_name, 
course_description,
date_start,
date_end,
storage_url, 
is_closed,
cost,
meeting_url,
school_id_id)
VALUES 
	('Computer Systems','Computer Systems description','2012-06-18','2012-06-18','storage.url','meeting.url',0, 1,1),
	('Data Mining Theory','Data Mining Theory description','2012-06-18','2012-06-18','storage.url','meeting.url',0, 1,1),
	('Web Design','Web Design description','2012-06-18','2012-06-18','storage.url','meeting.url',0, 1,1),
	('Accounting','Accounting description','2012-06-18','2012-06-18','storage.url','meeting.url',0, 1,1)
;

INSERT INTO api_lesson (lesson_name, date_start, date_end, course_id_id)
VALUES 
	('01-CPU', '2012-06-18','2013-06-18', 1),
	('02-Memory', '2012-06-18', '2013-06-18', 1),
	('03-Race Condition', '2012-06-18','2013-06-18', 1),
	('Visualization', '2012-06-18','2013-06-18', 2),
	('Statistical Test Review', '2012-06-18','2013-06-18', 2),
	('Naive Bayes Classifier', '2012-06-18','2013-06-18', 2),
	('Guidance', '2012-06-18','2013-06-18',3),
	('Digital Representation Of Information','2012-06-18','2013-06-18',3),
	('Information Design','2012-06-18','2013-06-18',3),
	('Financial Statement','2012-06-18','2013-06-18',4),
	('Investing and Financing','2012-06-18','2013-06-18',4)
;

INSERT INTO api_expandeduser
	(password,
	last_login,
	is_superuser,
	username,
	first_name,
	last_name,
	email,
	is_staff,
	is_active,
	date_joined,
	current_user_role)
VALUES 
	('password123', '2012-06-18', TRUE, 'John_Doe','John', 'Doe', 'JohnDoexoxo@email.com', FALSE, TRUE, '2012-06-18', 'ST'),
	('password123', '2012-06-18', TRUE, 'Jane_Doe','Jane', 'Doe', 'JaneDoexoxo@email.com', FALSE, TRUE, '2012-06-18', 'ST'),
	('password123', '2012-06-18', TRUE, 'NeverGonnaGiveYouUp','Rick', 'Astley', 'nenvergonnaletyoudown@email.com', FALSE, TRUE, '2012-06-18', 'ST'),
	('password123', '2012-06-18', TRUE, 'Lemon','Yoshi', 'Konezu', 'yoshikonezu@email.com', FALSE, TRUE, '2012-06-18', 'ST')
;

INSERT into api_student
VALUES (1),(2),(3);

INSERT into api_lecturer
VALUES (4);

INSERT INTO api_task(task_name, deadline, is_done, lesson_id_id, student_id_id)
VALUES 
('CPU assignment','2013-06-18',1,1,1 ),
('Memory assignment','2013-06-18',1,2,1 ),
('Race Condition assignment','2013-06-18',1,3,1 ),
('Never gonna run around and desert you','2013-06-18',1,7,3),
('Never gonna make you cry','2013-06-18',1,7,3),
('Never gonna say goodbye','2013-06-18',1,7,3),
('Never gonna tell a lie and hurt you','2013-06-18',1,7,3)
;

INSERT INTO api_assignmentform([order], is_closed, lesson_id_id, lecturer_id_id)
VALUES 
(1, 0, 1, 4),
(2, 0, 1, 4),
(3, 0, 1, 4),
(1, 0, 2, 4),
(2, 0, 2, 4)
;
-- INSERT INTO api_assignmentquestion(question, [order], weight, assignment_form_id_id, type)
-- VALUES
-- ('Definition of CPU', 1, 30, 1, 0),
-- ('CPU examples', 2, 30, 1, 0),
-- ('CPU prices research', 3, 30, 1, 0),
-- ('How CPU works', 1, 30, 2, 0),
-- ('How CPU was  created', 2, 30, 2, 0),
-- ('First CPU creation', 1, 30, 3, 0),
-- ('CPU stands for what?', 2, 30, 3, 0);

-- INSERT INTO api_assignmentanswer (answer, score, question_id_id, student_id_id)
-- VALUES 
-- ('Dummy answer for Definition of CPU', 10, 1, 1),
-- ('Dummy answer for CPU examples', 10, 2, 1),
-- ('Dummy answer for CPU prices research',10, 3, 1),
-- ('Dummy answer for How CPU works', 10, 4, 1),
-- ('Dummy answer for How CPU was  created',10, 5, 1),
-- ('Dummy answer for First CPU creation', 10, 6, 1),
-- ('Dummy answer for CPU stands for what?', 10, 7, 1),

-- ('(2)Dummy answer for Definition of CPU', 10, 1, 2),
-- ('(2)Dummy answer for CPU examples', 10, 2, 2),
-- ('(2)Dummy answer for CPU prices research',10, 3, 2),
-- ('(2)Dummy answer for How CPU works', 10, 4, 2),
-- ('(2)Dummy answer for How CPU was  created',10, 5, 2),
-- ('(2)Dummy answer for First CPU creation', 10, 6, 2),
-- ('(2)Dummy answer for CPU stands for what?', 10, 7, 2)
-- ;


