USE UlsterBook;

CREATE TABLE posts ( 
    id int IDENTITY(1,1) PRIMARY KEY, 
    posterId int NOT NULL, 
    postType varchar(15) NOT NULL,
    postDate int NOT NULL, 
    header varchar(255) NOT NULL, 
    body varchar(1200) NOT NULL,
    media varchar(1200),

    FOREIGN KEY (posterId) REFERENCES users(id) ON DELETE CASCADE
);