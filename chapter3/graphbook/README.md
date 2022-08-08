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
  mysql:8.0
```

Get into the MySQL.

```bash
docker exec -it graphbook-mysql mysql -u root -p
```

Create a user for the app.

```sql
CREATE USER 'devuser'@'%' IDENTIFIED BY 'PASSWORD';
GRANT ALL PRIVILEGES ON *.* TO 'devuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
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