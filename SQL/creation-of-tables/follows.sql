CREATE TABLE follows ( 
    followerId int,
    followingId int,

    FOREIGN KEY (followerId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followingId) REFERENCES users(id) ON DELETE CASCADE
);