const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');

// бд
let bd = new sqlite3.Database('./users.sqlite3', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Подключено к основной базе данных.');
});

// анализатор запросов жсон
app.use(express.json());

// регистр
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;

  // запрос к бд по регу
bd.run(sql, (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).send('Почта или никнейм уже используются.');
    } else {
      res.send('Пользователь успешно зарегистрирован.');
    }
  });
});

// логин
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  // запрос к бд по логину
  bd.get(sql, (err, row) => {
    if (err) {
      console.log(err.message);
      res.status(500).send('Ошибка входа.');
    } else if (row === undefined) {
      res.status(401).send('Неверная почта или пароль.'); //
    } else {
      res.send(`Пользователь ${row.username} авторизован.`);
    }
  });
});

app.listen(8000, () => {
  console.log('Порт сервера: 8000.');
});
