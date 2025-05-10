document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.login-form');
  const errorMessage = document.getElementById('errorMessage');

  if (!form) {
      console.error('Formulario no encontrado');
      return;
  }

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const correoInput = document.getElementById('correo');
      const contraseñaInput = document.getElementById('contraseña');

      if (!correoInput || !contraseñaInput) {
          console.error('Campos de entrada no encontrados');
          errorMessage.style.display = 'block';
          return;
      }

      const correo = correoInput.value.trim();
      const contraseña = contraseñaInput.value.trim();

      if (!correo || !contraseña) {
          errorMessage.textContent = 'Por favor, completa todos los campos.';
          errorMessage.style.display = 'block';
          return;
      }

      try {
          const response = await fetch('http://localhost:3000/loginfjbs', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ correo, contraseña })
          });

          const data = await response.json();

          if (response.ok) {
              localStorage.setItem('token', data.token);
              errorMessage.style.display = 'none';
              window.location.href = '../views/inicioMascotasfjbs.html';
          } else {
              errorMessage.textContent = data.msg || 'Error al iniciar sesión.';
              errorMessage.style.display = 'block';
          }
      } catch (error) {
          console.error('Error al iniciar sesión:', error);
          errorMessage.textContent = 'Error de conexión con el servidor.';
          errorMessage.style.display = 'block';
      }
  });
});