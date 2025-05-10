document.getElementById('login-form').addEventListener('submit', async (e)=>{
    e.preventDefault();

    const email_ws = document.getElementById('email_ws');
    const password_ws = document.getElementById('password_ws');

    try{
        const response = await fetch('http://192.168.88.102:3000/login_ws',{

            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email_ws: email_ws.value,
                password_ws: password_ws.value,
            }),
        });
       const data = await response.json();
       console.log('Respuesta del servidor:', data);

       if (response.ok){
        localStorage.setItem('token', data.token)
        window.location.href = '../views/getPets.html';
       }else {
        document.getElementById('message').textContent = data.message || 'Credenciales incorrectas';
       }
    } catch (error){
        console.error('Error al conectar con el servidor:', error);
        document.getElementById('message').textContent = 'No se pudo conectar con el servidor';
    }
})