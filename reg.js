const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (event) => {

event.preventDefault(); // без понятия что это

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

  // сохранение бд
  db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, result) => {
    if (error) {
      console.error(error);
      alert('Ошибка при регистрации');
    } else {
      console.log(result);
      alert(result);
    }
  })
});

db.close();
