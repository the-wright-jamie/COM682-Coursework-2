CREATE TABLE likes ( 
    postId int,
    commentId int,
    likedById int,

    FOREIGN KEY (likedById) REFERENCES users(id) ON DELETE CASCADE
);