const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// قنوات الأخبار ومصادرها
const sources = [
  {
    name: 'Al Jazeera',
    url: 'https://www.aljazeera.net/news',
    base: 'https://www.aljazeera.net',
    parse: ($) => {
      const articles = [];
      $('a u').each((i, el) => {
        const title = $(el).text().trim();
        const link = $(el).parent().attr('href');
        if (title && link) {
          articles.push({
            source: 'Al Jazeera',
            title,
            link: link.startsWith('http') ? link : 'https://www.aljazeera.net' + link
          });
        }
      });
      return articles;
    }
  },
  {
    name: 'Al Arabiya',
    url: 'https://www.alarabiya.net/latest-news',
    base: 'https://www.alarabiya.net',
    parse: ($) => {
      const articles = [];
      $('h3 a').each((i, el) => {
        const title = $(el).text().trim();
        const link = $(el).attr('href');
        if (title && link) {
          articles.push({
            source: 'Al Arabiya',
            title,
            link: link.startsWith('http') ? link : 'https://www.alarabiya.net' + link
          });
        }
      });
      return articles;
    }
  },
  {
    name: 'Sky News Arabia',
    url: 'https://www.skynewsarabia.com/latest-news',
    base: 'https://www.skynewsarabia.com',
    parse: ($) => {
      const articles = [];
      $('a.title').each((i, el) => {
        const title = $(el).text().trim();
        const link = $(el).attr('href');
        if (title && link) {
          articles.push({
            source: 'Sky News Arabia',
            title,
            link: link.startsWith('http') ? link : 'https://www.skynewsarabia.com' + link
          });
        }
      });
      return articles;
    }
  },
  {
    name: 'Asharq News',
    url: 'https://www.asharq.com/latest-news',
    base: 'https://www.asharq.com',
    parse: ($) => {
      const articles = [];
      $('a.card-title').each((i, el) => {
        const title = $(el).text().trim();
        const link = $(el).attr('href');
        if (title && link) {
          articles.push({
            source: 'Asharq News',
            title,
            link: link.startsWith('http') ? link : 'https://www.asharq.com' + link
          });
        }
      });
      return articles;
    }
  }
];

// API لجلب جميع الأخبار من كل المصادر
app.get('/api/news', async (req, res) => {
  try {
    const allNews = [];

    for (const source of sources) {
      try {
        const response = await axios.get(source.url);
        const $ = cheerio.load(response.data);
        const articles = source.parse($);
        allNews.push(...articles);
      } catch (err) {
        console.error(`خطأ في المصدر ${source.name}:`, err.message);
      }
    }

    res.json({ status: 'ok', count: allNews.length, articles: allNews });
  } catch (error) {
    console.error('خطأ عام:', error.message);
    res.status(500).json({ status: 'error', message: 'فشل في جلب الأخبار' });
  }
});

// صفحة افتراضية
app.get('/', (req, res) => {
  res.send('📡 Flash News API is Live - جميع القنوات العربية ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
