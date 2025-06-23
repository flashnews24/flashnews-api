const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const sources = [
      { name: 'الجزيرة', url: 'https://www.aljazeera.net/news' },
      { name: 'العربية', url: 'https://www.alarabiya.net/latest-news' },
      { name: 'الشرق الأوسط', url: 'https://aawsat.com/home/international/section' }
    ];

    const allNews = [];

    for (const source of sources) {
      const response = await axios.get(source.url);
      const $ = cheerio.load(response.data);

      let news = [];

      if (source.name === 'الجزيرة') {
        $('article h3 a').each((i, el) => {
          const title = $(el).text().trim();
          const link = $(el).attr('href');
          if (title && link) {
            news.push({
              source: source.name,
              title,
              link: link.startsWith('http') ? link : `https://www.aljazeera.net${link}`
            });
          }
        });
      }

      if (source.name === 'العربية') {
        $('.sc-3f6c7080-7 a').each((i, el) => {
          const title = $(el).text().trim();
          const link = $(el).attr('href');
          if (title && link) {
            news.push({
              source: source.name,
              title,
              link: link.startsWith('http') ? link : `https://www.alarabiya.net${link}`
            });
          }
        });
      }

      if (source.name === 'الشرق الأوسط') {
        $('h2 a').each((i, el) => {
          const title = $(el).text().trim();
          const link = $(el).attr('href');
          if (title && link) {
            news.push({
              source: source.name,
              title,
              link: link.startsWith('http') ? link : `https://aawsat.com${link}`
            });
          }
        });
      }

      allNews.push(...news);
    }

    res.json({ status: 'success', total: allNews.length, news: allNews });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'فشل في جلب الأخبار' });
  }
});

app.listen(PORT, () => {
  console.log(`FlashNews API running on port ${PORT}`);
});
