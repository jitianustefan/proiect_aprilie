-- creez baza de date
create database service_auto_js;



-- selectez baza de date pe care lucrez
use service_auto_js;
-- creez tabelele 

CREATE TABLE utilizatori(
	id_utilizator INT IDENTITY(1,1) PRIMARY KEY,
	nume VARCHAR(255) NOT NULL,
	prenume VARCHAR(255) NOT NULL,
	telefon VARCHAR(25) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	parola VARCHAR(255) NOT NULL,
	rol VARCHAR(64) NOT NULL,
	data_creare DATETIME NOT NULL DEFAULT SYSDATETIME(),
	data_modificare DATETIME
);

CREATE TABLE clienti (
	id_client INT IDENTITY(1,1) PRIMARY KEY,
	creatDe INT NOT NULL,
	nume VARCHAR(255) NOT NULL,
	prenume VARCHAR(255) NOT NULL,
	telefon VARCHAR(25) NOT NULL,
	email VARCHAR(255),
	status_client VARCHAR(50) DEFAULT 'activat',
	data_creare DATETIME NOT NULL DEFAULT SYSDATETIME(),
	data_modificare DATETIME
);

CREATE TABLE masini (
	id_masina INT IDENTITY(1,1) PRIMARY KEY,
	id_client INT NOT NULL,
	creatDe INT NOT NULL,
	nr_inmatriculare VARCHAR(25),
	serie_sasiu VARCHAR(25),
	marca VARCHAR(25),
	model VARCHAR(25),
	anul_fabricatiei INT,
	tip_motorizare VARCHAR(20),
	capacitate_motor FLOAT,
	cai_putere FLOAT,
	kw_putere FLOAT,
	status_masina VARCHAR(50) DEFAULT 'activat',
	data_creare DATETIME NOT NULL DEFAULT SYSDATETIME(),
	data_modificare DATETIME
);

CREATE TABLE programari (
	id_programare INT IDENTITY(1,1) PRIMARY KEY,
	id_client INT NOT NULL,
	id_masina INT NOT NULL,
	creatDe INT NOT NULL,
	data_inceput DATETIME NOT NULL,
	data_sfarsit DATETIME NOT NULL,
	stare_programare VARCHAR(25),
	actiune_masina VARCHAR(25),
	primire_masina VARCHAR(1000) DEFAULT '',
	procesare_masina VARCHAR(1000) DEFAULT '',
	durata_reparatie INT DEFAULT 0,
	data_creare DATETIME NOT NULL DEFAULT SYSDATETIME(),
	data_modificare DATETIME 
);



-- adaug relatiile dintre tabele prin constrangeri de cheie straina

ALTER TABLE clienti ADD CONSTRAINT fk_1 FOREIGN KEY (creatDe) REFERENCES utilizatori (id_utilizator);

ALTER TABLE masini ADD CONSTRAINT fk_2 FOREIGN KEY (id_client) REFERENCES clienti (id_client);
ALTER TABLE masini ADD CONSTRAINT fk_3 FOREIGN KEY (creatDe) REFERENCES utilizatori(id_utilizator);

ALTER TABLE programari ADD CONSTRAINT fk_4 FOREIGN KEY (id_client) REFERENCES clienti (id_client);
ALTER TABLE programari ADD CONSTRAINT fk_5 FOREIGN KEY (id_masina) REFERENCES masini (id_masina);
ALTER TABLE programari ADD CONSTRAINT fk_6 FOREIGN KEY (creatDe) REFERENCES utilizatori(id_utilizator);



