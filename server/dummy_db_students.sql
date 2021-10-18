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
	('password123', '20120618', TRUE, 'John_Doe','John', 'Doe', 'JohnDoexoxo@email.com', FALSE, TRUE, '20120618', 'ST'),
	('password123', '20120618', TRUE, 'Jane_Doe','Jane', 'Doe', 'JaneDoexoxo@email.com', FALSE, TRUE, '20120618', 'ST'),
	('password123', '20120618', TRUE, 'NeverGonnaGiveYouUp','Rick', 'Astley', 'nenvergonnaletyoudown@email.com', FALSE, TRUE, '20120618', 'ST')
;

INSERT into api_student
VALUES (1),(2),(3);
