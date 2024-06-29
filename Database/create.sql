CREATE TABLE Joueur (
    Pseudo varchar PRIMARY KEY,
    Email varchar CHECK (Email LIKE '%@%.%'),
    Prenom varchar NOT NULL,
    Nom varchar NOT NULL,
    Adresse varchar,
    CodePostal varchar,
    Ville varchar,
    Password text NOT NULL,
    Solde numeric NOT NULL DEFAULT 0
);

CREATE TABLE Parcelle (
    IdParcelle serial PRIMARY KEY,
    Nom varchar NOT NULL,
    PosX int NOT NULL,
    PosY int NOT NULL,
    Joueur varchar references Joueur(Pseudo),
    OnSale boolean DEFAULT false
);

CREATE TABLE Enchere (

    IdEnchere serial PRIMARY KEY,

    Joueur varchar references Joueur(Pseudo),
    Parcelle serial references Parcelle(IdParcelle),

    PrixDepart numeric NOT NULL CHECK (PrixDepart >= 0),
    DateDepart timestamp NOT NULL DEFAULT now(),
    DateFin timestamp NOT NULL,

    Images varchar DEFAULT 'default.png',
    Description varchar NOT NULL,

    Gagnant varchar references Joueur(Pseudo)

);


CREATE TABLE Mise (
    IdMise serial PRIMARY KEY,

    IdEnchere serial references Enchere(IdEnchere),
    Joueur varchar references Joueur(pseudo),

    DateMise timestamp DEFAULT now(),
    Prix numeric NOT NULL
);
