# Chapter 3

## Running a MySQL Container

Run a MySQL container.

```bash
docker run \
  --name graphbook-mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -v graphbook-mysql:/var/lib/mysql \
  -it \
  --rm \
  -d \
  -p 127.0.0.1:3306:3306 \
  mysql:8.0
```

Get into the MySQL.

```bash
docker exec -it graphbook-mysql mysql -u root -p
```

Setup database.

```sql
CREATE USER 'devuser'@'%' IDENTIFIED BY 'PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'devuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE graphbook_dev CHARACTER SET utf8 COLLATE utf8_general_ci;

quit
```

Test login.

```bash
docker exec -it graphbook-mysql mysql -u devuser -p
```

Stop the container.

```bash
docker stop  graphbook-mysql
```

## Setup the table and insert a dataset.

Install `sequelize-cli` at first.

```bash
npm install -g sequelize-cli
```

Create the table.

```bash
sequelize db:migrate --migrations-path src/server/migrations --config src/server/config/index.js
```

Insert a dataset.

```bash
sequelize db:seed:all --seeders-path src/server/seeders --config src/server/config/index.js
```