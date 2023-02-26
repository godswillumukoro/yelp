# PERN Stack

## PostgreSQL

- All Database: \l
- All tables: \d
- Details of One Table: \d table_name

### Creating a Table

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 AND price_range <= 5)
);

### Insert data into tables

INSERT INTO restaurants(name, location, price_range) VALUES ('788', 'Lekki', 4);

### Common Mistakes w/ inserting into Tables

1. Make all important fields required
2. Include check contraints on fields that need them

### Update data in tables
UPDATE restaurants SET name='Debonaires', location='Ajah', price_range=3 WHERE id=2;

### Delete data in tables
DELETE FROM restaurants WHERE id=10;

### Dropping Tables

DROP TABLE table_name;

### PRIMARY KEYS
A method of uniquely identifying table by specifying "PRIMARY KEY"

## Express

### MIDDLWARE
This function sits between the request (from a client) and response (from a server) cycle. It is possible to chain multiple middleware functions together. 
