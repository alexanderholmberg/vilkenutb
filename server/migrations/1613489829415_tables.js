/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
    CREATE TABLE programs (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      school VARCHAR(100),
      school_short VARCHAR(10),
      ort VARCHAR(100),
      anm_kod VARCHAR(20) UNIQUE
    );

    CREATE TABLE program_stats (
      id SERIAL PRIMARY KEY,
      bi_urval1 REAL,
      bi_urval2 REAL,
      bii_urval1 REAL,
      bii_urval2 REAL,
      hp_urval1 REAL,
      hp_urval2 REAL,
      antal_sokande INTEGER,
      antal_sokande_1a_hand INTEGER,
      termin varchar(10),
      program_id INTEGER REFERENCES programs(id),
      UNIQUE (program_id, termin)
    );

    CREATE TABLE subjects (
      id SERIAL PRIMARY KEY,
      name varchar(100) UNIQUE
    );

    CREATE TABLE keywords (
      ID SERIAL PRIMARY KEY,
      program_anm_kod VARCHAR(20) REFERENCES programs(anm_kod),
      subject_id INTEGER REFERENCES subjects(id)
    );

  `);
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE programs;
    DROP TABLE program_stats;
    DROP TABLE subjects;
    DROP TABLE keywords;
  `);
};