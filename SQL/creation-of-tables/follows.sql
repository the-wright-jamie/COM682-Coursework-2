USE UlsterBook;

CREATE TABLE follows ( 
    followerId int,
    followingId int,

    FOREIGN KEY (followerId) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (followingId) REFERENCES user(id) ON DELETE CASCADE
);