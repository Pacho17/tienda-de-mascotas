document.addEventListener('DOMContentLoaded', async () => {
    const petId = new URLSearchParams(window.location.search).get('id');
    const API_URL = "http://10.4.20.57:3000";

    // Función para obtener los encabezados de autenticación
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    };

    try {
        const response = await fetch(`${API_URL}/petsfjbs/${petId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('petPhoto').src = data.photo ? `${API_URL}/images/${data.photo}` : 'images/default-pet.png';
            document.getElementById('petName').textContent = data.name || 'Sin nombre';
            document.getElementById('petRace').textContent = data.race?.name || 'Sin raza';
            document.getElementById('petCategory').textContent = data.category?.name || 'Sin categoría';
            document.getElementById('petGender').textContent = data.gender?.name || 'Sin género';
        } else {
            alert('Error: ' + (data.msg || 'No se pudo cargar la mascota'));
        }
    } catch (error) {
        console.error('Error al cargar la mascota:', error);
        alert('Error de conexión con el servidor.');
    }
});