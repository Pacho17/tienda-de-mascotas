const API_URL = "http://192.168.18.165:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { "Authorization": `Bearer ${token}` } : {};
}

async function loadPets() {
  try {
    const res = await fetch(`${API_URL}/petsfjbs`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(`Error al cargar mascotas: ${res.statusText}`);

    const pets = await res.json();
    const container = document.getElementById("petList");
    container.innerHTML = "";

    if (!pets || pets.length === 0) {
      container.innerHTML = "<p>No hay mascotas registradas.</p>";
      return;
    }

    pets.forEach(pet => {
      const card = document.createElement("div");
      card.className = "pet-card";

      card.innerHTML = `
        <div class="pet-info">
          <img class="pet-photo" src="${pet.photo ? `${API_URL}/images/${pet.photo}` : 'images/default-pet.png'}" alt="Foto">
          <div>
            <h1 class="pet-name">${pet.name || 'Sin nombre'}</h1>
            <p class="pet-race">${pet.race?.name || 'Sin raza'}</p>
          </div>
        </div>
        <div class="pet-actions">
          <a href="vermascota.html?id=${pet.id}">
            <img src="images/btn-show.svg" alt="Ver">
          </a>
          <a href="editarmascotas.html?id=${pet.id}">
            <img src="images/btn-edit.svg" alt="Editar">
          </a>
          <img class="btn-delete" src="images/btn-delete.svg" alt="Eliminar" data-id="${pet.id}">
        </div>
      `;

      container.appendChild(card);
    });

    setupDeleteButtons();
  } catch (error) {
    console.error("Error al cargar mascotas:", error);
    const container = document.getElementById("petList");
    container.innerHTML = `<p>Error al cargar las mascotas. Verifica la conexión o el servidor: ${error.message}</p>`;
  }
}

function setupDeleteButtons() {
  document.querySelectorAll(".btn-delete").forEach(button => {
    button.addEventListener("click", async (event) => {
      const petId = event.currentTarget.getAttribute("data-id");
      if (!confirm("¿Estás seguro de que quieres eliminar esta mascota?")) return;

      try {
        const response = await fetch(`${API_URL}/petsfjbs/${petId}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error(`Error al eliminar mascota: ${response.statusText}`);

        alert("Mascota eliminada correctamente");
        loadPets(); // Recargar la lista
      } catch (error) {
        console.error("Error al eliminar mascota:", error);
        alert(`Error al eliminar mascota: ${error.message}`);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", loadPets);