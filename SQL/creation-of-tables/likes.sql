CREATE TABLE likes ( 
    postId int,
    commentId int,
    likedById int,

    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (commentId) REFERENCES comments(id),
    FOREIGN KEY (likedById) REFERENCES users(id) ON DELETE CASCADE
);