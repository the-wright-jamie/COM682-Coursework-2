USE UlsterBook;

CREATE TABLE users ( 
    id int IDENTITY(1,1) PRIMARY KEY,
    username varchar(24) UNIQUE NOT NULL,
    emailAddress varchar(255) UNIQUE NOT NULL,
    hashedPassword varchar(64) NOT NULL,
    avatar varchar(1200) DEFAULT 'assets/img/default.png',
    badge varchar(100),
    birthday int NOT NULL, 
    accountCreation int NOT NULL,
    isMuted bit DEFAULT 0 NOT NULL,
    isBanned bit DEFAULT 0 NOT NULL,
    isModerator bit DEFAULT 0 NOT NULL,
    isAdmin bit DEFAULT 0 NOT NULL
);