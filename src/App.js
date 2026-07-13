import './App.css';

function App() {

  const iniciarSesion = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Completa los campos");
      return;
    }

    if (email === "admin@lunai.com" && password === "123456") {
      alert("Bienvenida a lunAI 🌙✨");
    } else {
      alert("Datos incorrectos");
    }
  };

  return (
    <div className="container">
      <img src={require('./imagenes/logo.png')} alt="Logo lunAI" className="logo-img" />
      <p className="subtitle">Conecta con tu ciclo. Transforma tu vida.</p>

      <div className="card">
        <div className="logo">🌙</div>

        <input id="email" type="email" placeholder="Correo electrónico" />
        <input id="password" type="password" placeholder="Contraseña" />

        <div className="links">
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">Crear cuenta</a>
        </div>

        <button onClick={iniciarSesion}>Iniciar sesión</button>
      </div>
    </div>
  );
}

export default App;