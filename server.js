const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;
app.use(cors());

const sources = [
  {
    name: "الجزيرة",
    url: "https://www.aljazeera.net/aljazeera/rss",
    type: "rss2json"
  },
  {
    name: "العربية",
    url: "https://www.alarabiya.net/.mrss/ar.xml",
    type: "rss2json"
  },
  {
    name: "الشرق",
    url: "https://asharq.com/ar/rss",
    type: "rss2json"
  },
  {
    name: "البيان",
    url: "https://www.albayan.ae/polopoly_fs/1.1332679!/rss/rss.xml",
    type: "rss2json"
  }
];

app.get('/news', async (req, res) => {
  try {
    const results = await Promise.all(
      sources.map(async (source) => {
        const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}`);
        return {
          source: source.name,
          articles: response.data.items.slice(0, 10)
        };
      })
    );
    res.json({ status: "ok", updated: new Date(), data: results });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ status: "error", message: "فشل في جلب الأخبار" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ FlashNews API running on port ${PORT}`);
});
