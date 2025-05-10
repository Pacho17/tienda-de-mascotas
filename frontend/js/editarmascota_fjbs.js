document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('petForm');
    const petPhoto = document.getElementById('petPhoto');
    const photoInput = document.getElementById('photo');
    const petId = new URLSearchParams(window.location.search).get('id');
    const API_URL = "http://192.168.18.165:3000";

    // Función para obtener los encabezados de autenticación
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    // Cargar datos iniciales
    if (petId) {
        try {
            const response = await fetch(`${API_URL}/petsfjbs/${petId}`, {
                headers: getAuthHeaders()
            });
            const data = await response.json();

            if (response.ok) {
                document.getElementById('petId').value = data.id;
                document.getElementById('name').value = data.name || 'Reigner';
                document.getElementById('race').value = data.race?.name || 'Bulldog';
                document.getElementById('category').value = data.category?.name || 'Perro';
                document.getElementById('gender').value = data.gender?.name || 'Macho';
                petPhoto.src = data.photo ? `${API_URL}/images/${data.photo}` : '';
            } else {
                alert('Error: ' + (data.msg || 'No se pudo cargar la mascota'));
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
            alert('Error de conexión con el servidor.');
        }
    }

    // Vista previa de la foto
    photoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                petPhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', petId);
        formData.append('name', document.getElementById('name').value.trim());
        formData.append('race_id', document.getElementById('race').value.trim());
        formData.append('category_id', document.getElementById('category').value.trim());
        formData.append('gender_id', document.getElementById('gender').value.trim());
        if (photoInput.files[0]) {
            formData.append('photo', photoInput.files[0]);
        }

        try {
            const response = await fetch(`${API_URL}/petsfjbs/${petId}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                alert('Mascota actualizada con éxito');
                window.location.href = 'mascotasInicio.html';
            } else {
                alert('Error: ' + (data.msg || 'Error al actualizar la mascota'));
            }
        } catch (error) {
            console.error('Error al actualizar mascota:', error);
            alert('Error de conexión con el servidor.');
        }
    });
});