const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'Uploads')));

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'Soloyo', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Simulación de consulta a la base de datos
const getPetsFromDatabase = async () => {
  // Reemplaza con tu consulta real (Sequelize, Mongoose, etc.)
  return [
    {
      id: 1,
      name: 'Max',
      race: { name: 'Labrador' },
      category: { name: 'Perro' },
      gender: { name: 'Macho' },
      User: { fullname: 'Juan Pérez' },
      estado: 'Disponible',
      photo: 'max.jpg'
    },
    {
      id: 2,
      name: 'Luna',
      race: { name: 'Pastor Alemán' },
      category: { name: 'Perro' },
      gender: { name: 'Hembra' },
      User: { fullname: 'Ana Gómez' },
      estado: 'Adoptado',
      photo: 'luna.jpg'
    }
  ];
};

// Simulación de eliminación de una mascota
const deletePetFromDatabase = async (id) => {
  // Reemplaza con tu lógica real de eliminación
  return true; // Simula eliminación exitosa
};

// Endpoint para obtener mascotas
app.get('/petsfjbs', authenticateToken, async (req, res) => {
  try {
    const pets = await getPetsFromDatabase();
    res.json(pets);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
});

// Endpoint para eliminar una mascota
app.delete('/petsfjbs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deletePetFromDatabase(id);
    if (!success) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    res.status(200).json({ message: 'Mascota eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar mascota:', error);
    res.status(500).json({ message: 'Error al eliminar mascota' });
  }
});

// Endpoint para generar el reporte en PDF
app.get('/generar-reporte-mascotas', authenticateToken, async (req, res) => {
  try {
    const pets = await getPetsFromDatabase();
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const pdfPath = path.join(__dirname, `reportes/reporte_mascotas${Date.now()}.pdf`);

    if (!fs.existsSync('reportes')) {
      fs.mkdirSync('reportes');
    }

    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text('Reporte de Mascotas', { align: 'center' });
    doc.moveDown();
    doc.moveTo(50, 100).lineTo(550, 100).stroke();
    doc.moveDown();

    doc.fontSize(14).text('Lista de Mascotas', { underline: true });
    doc.moveDown(0.5);

    pets.forEach((pet, index) => {
      doc.fontSize(12);
      doc.text(`${index + 1}. Nombre: ${pet.name || 'Sin nombre'}`);
      doc.text(`   Raza: ${pet.race?.name || 'Sin raza'}`);
      doc.text(`   Categoría: ${pet.category?.name || 'Sin categoría'}`);
      doc.text(`   Género: ${pet.gender?.name || 'Sin género'}`);
      doc.text(`   Usuario: ${pet.User?.fullname || 'Sin usuario'}`);
      doc.text(`   Estado: ${pet.estado || 'Sin estado'}`);
      
      if (pet.photo) {
        const photoPath = path.join(__dirname, 'Uploads', pet.photo);
        if (fs.existsSync(photoPath)) {
          doc.image(photoPath, { fit: [100, 100], align: 'center', valign: 'center' });
        } else {
          doc.text('   [Foto no disponible]');
        }
      }
      doc.moveDown();
    });

    doc.fontSize(10).text(`Generado el: ${new Date().toLocaleDateString()}`, 50, doc.page.height - 50, {
      align: 'center',
    });

    doc.end();

    res.download(pdfPath, 'reporte_mascotas.pdf', (err) => {
      if (err) {
        console.error('Error al enviar el PDF:', err);
        res.status(500).json({ message: 'Error al generar el reporte' });
      }
      fs.unlinkSync(pdfPath);
    });
  } catch (error) {
    console.error('Error al generar el reporte:', error);
    res.status(500).json({ message: 'Error al generar el reporte' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://192.168.18.165:3000${port}`);
});