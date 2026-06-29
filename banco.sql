CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE livros (
	id INT auto_increment primary key,
    titulo varchar(100)	NOT NULL,
    autor varchar(100) NOT NULL,
    categoria varchar(100) NOT NULL
);

INSERT INTO livros (titulo, autor, categoria) 
VALUES ("Dom Casmurro", "Machado de Assis", "Romance");

SELECT * FROM livros;