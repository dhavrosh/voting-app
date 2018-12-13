FROM mysql:latest

ENV MYSQL_DATABASE voting_dev_db 
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes

ADD setup.sql /docker-entrypoint-initdb.d