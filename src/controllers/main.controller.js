const axios = require('axios');
const cheerio = require('cheerio');

async function getMainPage(req, res) {
  const welcomeMessge = 'Welcome to the main page';
  res.status(200).json({
    message: welcomeMessge 
  });
}

async function getHealthCheck(req, res) {
    res.status(200).json({
        message: 'Server is running'
    });
}

async function getAceitePrecios(req, res) {
  try {
    const precioUrl = 'https://www.asajajaen.com/precio-del-aceite';
    const { data: precioData } = await axios.get(precioUrl);
    
    // Aquí cambiamos el nombre de '$' a 'dom' o cualquier otro nombre
    const dom = cheerio.load(precioData); 

    const filas = [];
    dom('tbody').each((i, el) => {
      const fila = [];
      dom(el).find('tr').each((j, tr) => {
        dom(tr).find('td').each((k, td) => {
          fila.push(dom(td).text().trim());
        });
      });
      filas.push(fila);
    });

    const virgenExtraData = filas.map(fila => {
      const virgenExtraIndex = fila.indexOf('Virgen Extra');
      if (virgenExtraIndex !== -1) {
        return {
          nombre: fila[virgenExtraIndex],
          precio: fila[virgenExtraIndex + 1]
        };
      }
      return null;
    }).filter(item => item !== null);

    const primerVirgenExtra = virgenExtraData[0] || null;
    res.json(primerVirgenExtra);
  } catch (error) {
    console.error('Error al hacer scraping:', error);
    res.status(500).json({ error: 'Error al hacer scraping' });
  }
}

// Ruta para obtener las noticias sobre aceite
async function getAceiteNoticias(req, res) {
  try {
    const noticiasUrl = 'https://www.asajajaen.com/category/actualidad/olivar';
    const { data: noticiasData } = await axios.get(noticiasUrl);
    const $ = cheerio.load(noticiasData);

    const noticias = [];
    $('.recent-post.clearfix').each((i, el) => {
      if (i < 4) {
        const enlaceParcial = $(el).find('h2 a').attr('href');
        const enlace = `https://www.asajajaen.com${enlaceParcial}`;
        const descripcion = $(el).find('h2 a').text().trim();
        const imagen = $(el).find('img').attr('src') || null;
        const titulo = descripcion; // si querés usar el mismo texto como título también

        noticias.push({
          titulo,
          descripcion,
          enlace,
          imagen
        });
      }
    });

    res.json(noticias);
  } catch (error) {
    res.status(500).json({ error: 'Error al hacer scraping' });
  }
}



module.exports = {
    getMainPage,
    getHealthCheck,
    getAceitePrecios,
    getAceiteNoticias
};