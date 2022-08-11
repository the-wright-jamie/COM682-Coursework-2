CREATE TABLE comments ( 
    id int IDENTITY(1,1) PRIMARY KEY, 
    postId int NOT NULL,
    posterId int NOT NULL,
    postDate int NOT NULL,
    body varchar(1200) NOT NULL,

    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
);