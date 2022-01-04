DELETE FROM api_course;
DELETE FROM api_lesson;
DELETE FROM api_school;
DELETE FROM api_task;
DELETE FROM api_expandeduser;
DELETE FROM api_student;

DELETE FROM sqlite_sequence 
	where name in 
		('api_course',
		'sqlite_sequence',
        'api_lesson',
        'api_school',
        'api_task',
        'api_expandeduser',
        'api_student')
;