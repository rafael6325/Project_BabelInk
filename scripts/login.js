function showRegisterForm() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
  document.getElementById('forgot-password-form').classList.add('hidden');
  clearMessages();
}

function showLoginForm() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
  document.getElementById('forgot-password-form').classList.add('hidden');
  clearMessages();
}

function showForgotPasswordForm() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.add('hidden');
  document.getElementById('forgot-password-form').classList.remove('hidden');
  clearMessages();
}

function clearMessages() {
  document.getElementById('login-message').textContent = '';
  document.getElementById('register-message').textContent = '';
  document.getElementById('forgot-message').textContent = '';
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    document.getElementById('main-page-posts').classList.remove('hidden');
    document.getElementById('login-page-form').classList.add('hidden');
    document.addEventListener('DOMContentLoaded', (event) => {
      loadPosts();
      loadUser();
    });
  } else {
      document.getElementById('login-message').textContent = 'Usuário não cadastrado ou senha incorreta.';
  }
}

function register() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  if (password !== confirmPassword) {
      document.getElementById('register-message').textContent = 'Senhas não correspondem.';
      return;
  }

  if (!validateEmail(email)) {
      document.getElementById('register-message').textContent = 'Email inválido.';
      return;
  }

  const userExists = users.some(user => user.email === email || user.name === name);
  if (userExists) {
      document.getElementById('register-message').textContent = 'Usuário já cadastrado.';
      return;
  }

  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('register-message').textContent = 'Cadastro realizado com sucesso!';
  showLoginForm();
}

function forgotPassword() {
  const email = document.getElementById('forgot-email').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const user = users.find(user => user.email === email);
  if (user) {
      document.getElementById('forgot-message').textContent = 'Email de recuperação enviado.';
  } else {
      document.getElementById('forgot-message').textContent = 'Email não cadastrado.';
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function loadUser() {
  const user = JSON.parse(localStorage.getItem('users'));
  const loggedUser = user[user.length - 1].name;
  return loggedUser;
};

function clearMessages() {
  document.getElementById('nullpost-message').textContent = '';
};

function clearPostContent() {
  document.getElementById('postText').value = '';
};

function createPost() {
    event.preventDefault();
    let post = document.getElementById('postText').value;
    if (!post) {
      document.getElementById('nullpost-message').textContent = 'Não pode estar vazio.';
      return;
    }
    clearMessages();
    let postContainer = document.getElementById('mainPosts');
    const date = new Date().toLocaleString();

    const actualUser = loadUser();

    const newPost = `<div class="card">
            <div class="post">
              <div class="userInfo"></div>
                <div class="userImg"></div>
                <h3 class="author">${actualUser}</h3>
                <p class="cardText">
                ${post}
                </p>
                <div class="dateHour">
                  <p>${date}</p>
                </div>
                <div class="actionBtnPost">
                  <button type="button" class="like btn btn-primary" onclick="likeCount()">Curtir</button>
                  <button type="button" class="comment btn btn-primary" onclick="commentPost()">Comentar</button>
                  <button type="button" class="share btn btn-primary" onclick="sharePost()">Compartilhar</button>
                </div>
            </div>
          </div>`;

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(newPost);
    
    localStorage.setItem('posts', JSON.stringify(posts));

    const addPost = postContainer.innerHTML + newPost;
    postContainer.innerHTML = addPost;
    clearPostContent();
  };

  function renderPosts() {
    let postContainer = document.getElementById('mainPosts');
    postContainer.innerHTML = '';

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
      const postHTML = post;
      const histPost = postContainer.innerHTML + postHTML;
      postContainer.innerHTML = histPost;
    });
  };

  function loadPosts() {
    renderPosts();
    loadUser();
  };