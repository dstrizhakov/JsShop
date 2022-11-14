### Простой магазин на JavaScript

Чтобы развернуть проект, клонируем этот репозиторий к себе на компьютер, в директорию `shop`

```
https://github.com/dstrizhakov/JsShop.git
```

Создаем базу данных с помощью утилиты `psql`

```
/path/to/postgre/bin/psql -U postgres
Пароль: qwerty

postgres=# CREATE DATABASE online_store;

postgres=# \q
```

Имя БД и логин-пароль прописывам в `server/.env`

```
DB_HOST=localhost
DB_NAME=online_store
DB_USER=postgres
DB_PASS=qwerty
DB_PORT=5432
```

Переходим в директорию `shop/server`, устанавливаем пакеты, запускаем сервер

```
cd /path/to/shop/server
npm install
npm run start-dev
```

Переходим в директорию `shop/client`, устанавливаем пакеты, запускаем клиент

```
cd /path/to/shop/client
npm install
npm start
```

#### Примечания

Таблицы базы данных будут созданы при первом запуске приложения, но они будут пустыми. Можно импортировать базу данных из файла `database.sql`, в которой уже есть категории, бренды, товары, пользователи и т.д.


```
/path/to/postgre/bin/psql -U postgres online_store < /path/to/shop/database.sql
Пароль: qwerty
```

Здесь `postgres` — имя пользователя БД, `qwerty` — пароль для доступа к БД, `online_store` — имя базы данных магазина.

---

Дамп базы данных `database.sql` был создан с помощью утилиты `pg_dump` на заключительном этапе разработки магазина

```
/path/to/postgre/bin/pg_dump -U postgres online_store > /path/to/shop/database.sql
Пароль: qwerty
```

Здесь `postgres` — имя пользователя БД, `qwerty` — пароль для доступа к БД, `online_store` — имя базы данных магазина.

---

Список баз данных можно посмотреть, если запустить утилиту `psql` и выполнить SELECT-запрос

```
/path/to/postgre/bin/psql -U postgres
Пароль: qwerty

postgres=# SELECT datname FROM pg_database;

datname
-----------------
postgres
online_store
template1
template0

postgres=# \q
```

---

Дамп базы данных содержит несколько пользователей, как обычных, так и с правами администратора

* Пользователь `user@mail.ru`, пароль `qwerty`
* Пользователь `admin@mail.ru`, пароль `qwerty`

