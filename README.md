# Egzamin - React + Node.js + MySql


## How to run
1. You need MySql server running
    - Database name: `egzamin`
    - User name: `root`
    - Host: `localhost`
    - Password: ` ` (empty)
    - Table: `list`
        - `id`: int primary key
        - `data`: text
2. In server directory you need to install dependencies: `npm install`
3. In client directory you need to install dependencies: `npm install`
4. To run server type in terminal in server directory: `node index.js`
5. To run client type in terminal in client directory: `npm start`

## Scripts for database:
```sql
CREATE DATABASE egzamin;
```

Inside egzamin db:
```sql
CREATE TABLE `list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` text DEFAULT NULL,
  PRIMARY KEY (id)
);
```
