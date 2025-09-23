-- Data kahan store hota hai
-- Data MySQL server ki data directory me store hota hai (OS/installation ke hisaab se path alag hota hai).
-- schema.sql sirf instructions (how to create/insert), file khud data nahi rakhti.


CREATE TABLE students (
    id VARCHAR (50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
);
