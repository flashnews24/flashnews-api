const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');
const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('FlashNews API يعمل ✅');
});

app.get('/api/news', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://www.aljazeera.net/xml/rss/all.xml');
    const items = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet
    }));
    res.json(items);
  } catch (err) {
    console.error('Error fetching news:', err.message);
    res.status(500).json({ error: 'فشل في جلب الأخبار' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
