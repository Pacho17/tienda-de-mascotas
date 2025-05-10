document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('petForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const petId = new URLSearchParams(window.location.search).get('id');
        const name = document.getElementById('name').value.trim();
        const race = document.getElementById('race').value.trim();
        const category = document.getElementById('category').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const photo = document.getElementById('photo').files[0];

        const formData = new FormData();
        formData.append('id', petId);
        formData.append('name', name);
        formData.append('race_id', race); // Enviar como string, backend lo mapeará
        formData.append('category_id', category);
        formData.append('gender_id', gender);
        formData.append('User_id', '1'); // Valor por defecto si no hay campo en el formulario
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await fetch(`http://192.168.18.165:3000/petsfjbs/${petId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Agregar token si existe
                },
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

    // Cargar datos iniciales
    const petId = new URLSearchParams(window.location.search).get('id');
    if (petId) {
        fetch(`http://192.168.18.165:3000/petsfjbs/${petId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        })
            .then(response => response.json())
            .then(pet => {
                document.getElementById('petId').value = pet.id;
                document.getElementById('name').value = pet.name || 'Reigner';
                document.getElementById('race').value = pet.race?.name || 'Bulldog';
                document.getElementById('category').value = pet.category?.name || 'Perro';
                document.getElementById('gender').value = pet.gender?.name || 'Macho';
                document.getElementById('petPhoto').src = pet.photo ? `http://192.168.18.165:3000/images/${pet.photo}` : '';
            })
            .catch(error => console.error('Error al cargar datos:', error));
    }

    // Vista previa de la foto
    const photoInput = document.getElementById('photo');
    const petPhoto = document.getElementById('petPhoto');
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
});