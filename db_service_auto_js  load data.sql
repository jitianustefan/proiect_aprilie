-- populez baza de date
use service_auto_js;

-- adaug utilizatorii
INSERT INTO utilizatori(nume,prenume,telefon, email,parola, rol) VALUES ('Vasiliu','George','0766212331','vasgrg@gmail.com','parola','administrator');
INSERT INTO utilizatori(nume,prenume,telefon, email,parola, rol)VALUES ('Alexandrescu','Alex','0751000111','alxalx@gmail.com','parola','relatii_clienti');

-- adaug clientii
INSERT INTO clienti(creatDe,nume, prenume, telefon, email) VALUES (2,'Apostol','Bogdan','0723222222','apsbogd@gmail.com');
INSERT INTO clienti(creatDe,nume, prenume, telefon, email) VALUES (2,'Ion','Ionescu','0723555333','ionion@gmail.com');
INSERT INTO clienti(creatDe,nume, prenume, telefon, email) VALUES (2,'Mateescu','Cristi','0723111232','matcris@gmail.com');
INSERT INTO dbo.clienti(creatDe,nume, prenume, telefon, email) VALUES (2,'Valeru','Gica','0726171000','gicaval@gmail.com');

-- adaug masinile clientilor
INSERT INTO masini (id_client,creatDe,nr_inmatriculare,serie_sasiu,marca,model,anul_fabricatiei,tip_motorizare,capacitate_motor,cai_putere,kw_putere) 
VALUES (1,2,'B02BOB','XCQ2224DA','AUDI','Q7',2005,'diesel',3.0,200,147.06);

INSERT INTO masini (id_client,creatDe,nr_inmatriculare,serie_sasiu,marca,model,anul_fabricatiei,tip_motorizare,capacitate_motor,cai_putere,kw_putere) 
VALUES (1,2,'B02APS','RRR444A','BMW','X5',2010,'diesel',3.0,200,147.06);

INSERT INTO masini (id_client,creatDe,nr_inmatriculare,serie_sasiu,marca,model,anul_fabricatiei,tip_motorizare,capacitate_motor,cai_putere,kw_putere) 
VALUES (2,2,'BR99ION','XQEION000099','TOYOTA','C-HR',2020,'hibrid',1.8,122,89.71);

INSERT INTO masini (id_client,creatDe,nr_inmatriculare,serie_sasiu,marca,model,anul_fabricatiei,tip_motorizare,capacitate_motor,cai_putere,kw_putere) 
VALUES (3,2,'GR08MAT','RRR444AMATT','BMW','X5',2013,'diesel',3.0,200,147.06);

INSERT INTO masini (id_client,creatDe,nr_inmatriculare,serie_sasiu,marca,model,anul_fabricatiei,tip_motorizare,capacitate_motor,cai_putere,kw_putere) 
VALUES (4,2,'DB11GIC','OOOPPP0203','DACIE','Logan',2010,'benzina',1.5,80,58.82);

--adaug programarile
INSERT INTO programari(id_client,id_masina,creatDe,data_inceput,data_sfarsit,stare_programare,actiune_masina,primire_masina,procesare_masina,durata_reparatie) 
VALUES (1,2,1,'2024-02-21 10:00:00','2024-02-21 10:30:00','finalizata','revizie','intacta','schimbat filtre, schimbat ulei motor',50);

INSERT INTO programari(id_client,id_masina,creatDe,data_inceput,data_sfarsit,stare_programare,actiune_masina,primire_masina,procesare_masina) 
VALUES (2,1,2,'2024-05-1 10:30:00','2024-02-21 11:00:00','activa','verificare','','');

INSERT INTO programari(id_client,id_masina,creatDe,data_inceput,data_sfarsit,stare_programare,actiune_masina) 
VALUES (4,1,2,'2024-04-29 13:30:00','2024-02-21 15:00:00','activa','revizie');

INSERT INTO programari(id_client,id_masina,creatDe,data_inceput,data_sfarsit,stare_programare,actiune_masina) 
VALUES (3,1,2,'2024-03-21 11:00:00','2024-02-21 12:00:00','anulata','revizie');