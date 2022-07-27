@echo off

sqlcmd -i creation-of-tables/database.sql
sqlcmd -i creation-of-tables/users.sql
sqlcmd -i creation-of-tables/posts.sql
sqlcmd -i creation-of-tables/comments.sql
sqlcmd -i creation-of-tables/likes.sql

sqlcmd -i insertion-of-mock-data/sample-users.sql
sqlcmd -i insertion-of-mock-data/sample-posts.sql
sqlcmd -i insertion-of-mock-data/sample-comments.sql
sqlcmd -i insertion-of-mock-data/sample-likes.sql