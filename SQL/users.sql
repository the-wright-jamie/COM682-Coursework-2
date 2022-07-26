USE UlsterBook;

CREATE TABLE users ( 
    id int IDENTITY(1,1) PRIMARY KEY,
    username varchar(12) NOT NULL,
    emailAddress int NOT NULL,
    hashedPassword varchar(64) NOT NULL,
    birthday int NOT NULL, 
    accountCreation int NOT NULL,
    isDeleted bit DEFAULT 0 NOT NULL,
    isMuted bit DEFAULT 0 NOT NULL,
    isBanned bit DEFAULT 0 NOT NULL,
    isModerator bit DEFAULT 0 NOT NULL,
    isAdmin bit DEFAULT 0 NOT NULL
);