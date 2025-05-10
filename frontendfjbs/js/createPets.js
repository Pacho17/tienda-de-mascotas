const form = document.getElementById('form-mascota');

form.addEventListener('submit', async (e)=>{
    e.defaultPrevented();

    const formData = new FormData(form);
    const data = {
        nombre: formData.get('nombre'),
        raza: formData.get('raza'),
        cat
    }
})