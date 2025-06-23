const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// جلب أخبار من موقع الجزيرة
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get('https://www.aljazeera.net/news');
    const $ = cheerio.load(response.data);
    const articles = [];

    $('a u').each((i, el) => {
      const title = $(el).text().trim();
      const link = 'https://www.aljazeera.net' + $(el).parent().attr('href');
      if (title && link) {
        articles.push({ title, link });
      }
    });

    res.json({ source: 'Al Jazeera', articles });
  } catch (error) {
    console.error('حدث خطأ أثناء جلب الأخبار:', error.message);
    res.status(500).json({ error: 'فشل في جلب الأخبار' });
  }
});

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('✅ Flash News API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
