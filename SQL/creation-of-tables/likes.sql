USE UlsterBook;

CREATE TABLE likes ( 
    postId int,
    commentId int,
    likedById int,

    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (commentId) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (likedById) REFERENCES users(id) ON DELETE CASCADE
);