# Chapter 3

Tested in node 14.

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

Remove the dataset if you want to reset data.

```bash
sequelize db:seed:undo:all --seeders-path src/server/seeders --config src/server/config/index.js
```

## Run the app

Run the server.

```
NODE_ENV=development npm run server
```


## GraphQL Query Examples

```sh
curl -X POST http://localhost:8000/graphql \
-H "Content-Type: application/json" \
-d '{ "operationName": null, "query": "{ posts { id text } }", "variables": {} }'
```

```sh
curl -X POST http://localhost:8000/graphql \
-H "Content-Type: application/json" \
-d '{ "operationName": null, "query": "mutation addPost($post : PostInput!) { addPost(post : $post) { id text user { username avatar }}}", "variables":{ "post": { "text": "You just added a post." } } }'
```

```sh
curl -X POST http://localhost:8000/graphql \
-H "Content-Type: application/json" \
-d '{ "operationName":null, "query": "mutation addChat($chat: ChatInput!) { addChat(chat: $chat) { id users { id } }}", "variables":{ "chat": { "users": [1, 2] } } }'
```


```sh
curl -X POST http://localhost:8000/graphql \
-H "Content-Type: application/json" \
-d '{ "operationName":null, "query": "{ chats { id users { id } messages { id text user { id username } } } }", "variables":{} }'
```

```sh
curl -X POST http://localhost:8000/graphql \
-H "Content-Type: application/json" \
-d '{ "operationName":null, "query": "query($chatId: Int!){ chat(chatId: $chatId) { id users { id } messages { id text user { id username } } } }", "variables":{ "chatId": 1 } }'
```

```sh
curl -X POST http://localhost:8000/graphql \
-H "Content-Type: application/json" \
-d '{ "operationName":null, "query": "mutation addMessage($message : MessageInput!) { addMessage(message : $message) { id text }}", "variables":{ "message": { "text": "You just added a message.", "chatId": 1 } } }'
```