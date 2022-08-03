CREATE TABLE loggedInUsers (
	userId int,
	token varchar(38),

	FOREIGN KEY (userId) REFERENCES users(id),
);