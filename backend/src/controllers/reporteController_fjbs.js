import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';

const prisma = new PrismaClient();

// Obtener datos para reportes (JSON)
const getReports = async (req, res) => {
  try {
    const pets = await prisma.pets.findMany({
      select: {
        id: true,
        name: true,
        estado: true,
        race: { select: { name: true } },
        category: { select: { name: true } },
        gender: { select: { name: true } },
        user: { select: { fullname: true } },
      },
    });
    const stats = {
      Disponible: pets.filter(p => p.estado === 'Disponible').length,
      Adoptado: pets.filter(p => p.estado === 'Adoptado').length,
    };
    res.json({ pets, stats });
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

// Generar y descargar PDF con tabla y gráfica
const downloadReport = async (req, res) => {
  try {
    const pets = await prisma.pets.findMany({
      include: {
        race: true,
        category: true,
        gender: true,
        user: true,
      },
    });

    const stats = {
      Disponible: pets.filter(p => p.estado === 'Disponible').length,
      Adoptado: pets.filter(p => p.estado === 'Adoptado').length,
    };

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-mascotas.pdf');
    doc.pipe(res);

    doc.fontSize(20).text('Reporte de Mascotas', { align: 'center' });
    doc.moveDown();

    const tableTop = 100;
    const colWidth = 75;
    const headers = ['ID', 'Nombre', 'Raza', 'Categoría', 'Género', 'Estado', 'Propietario'];
    doc.fontSize(10).font('Helvetica-Bold');
    headers.forEach((header, i) => {
      doc.text(header, 50 + i * colWidth, tableTop, { width: colWidth, align: 'left' });
    });

    doc.font('Helvetica').fontSize(10);
    pets.forEach((pet, index) => {
      const y = tableTop + 20 + index * 20;
      doc.text(pet.id, 50, y, { width: colWidth, align: 'left' });
      doc.text(pet.name, 50 + colWidth, y, { width: colWidth, align: 'left' });
      doc.text(pet.race.name, 50 + 2 * colWidth, y, { width: colWidth, align: 'left' });
      doc.text(pet.category.name, 50 + 3 * colWidth, y, { width: colWidth, align: 'left' });
      doc.text(pet.gender.name, 50 + 4 * colWidth, y, { width: colWidth, align: 'left' });
      doc.text(pet.estado, 50 + 5 * colWidth, y, { width: colWidth, align: 'left' });
      doc.text(pet.user.fullname, 50 + 6 * colWidth, y, { width: colWidth, align: 'left' });
    });

    doc.addPage();
    doc.fontSize(16).text('Estadísticas de Mascotas por Estado', { align: 'center' });
    doc.moveDown();

    const canvas = createCanvas(500, 300);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Disponible', 'Adoptado'],
        datasets: [{
          label: 'Cantidad de Mascotas',
          data: [stats.Disponible, stats.Adoptado],
          backgroundColor: ['#36A2EB', '#FF6384'],
        }],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    const chartImage = canvas.toBuffer('image/png');
    doc.image(chartImage, 50, 150, { width: 500 });

    doc.end();
  } catch (error) {
    console.error('Error al generar reporte PDF:', error);
    res.status(500).json({ error: 'Error al generar reporte PDF' });
  }
};

export { getReports, downloadReport };