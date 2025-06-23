const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 10000;

// مصادر الأخبار العربية (تقدر تضيف أو تعدل)
const sources = [
  {
    name: "الجزيرة",
    url: "https://www.aljazeera.net/news/",
    selector: ".gc__title a",
    base: "https://www.aljazeera.net"
  },
  {
    name: "العربية",
    url: "https://www.alarabiya.net/latest-news",
    selector: ".sc-bQCEYZ a.card-title",
    base: "https://www.alarabiya.net"
  },
  {
    name: "الشرق الأوسط",
    url: "https://aawsat.com/home/article/all",
    selector: ".mainContent .title a",
    base: "https://aawsat.com"
  }
];

app.get("/", (req, res) => {
  res.send("✅ FlashNews API شغّال.");
});

app.get("/news", async (req, res) => {
  try {
    const newsList = [];

    for (const source of sources) {
      const response = await axios.get(source.url);
      const $ = cheerio.load(response.data);

      $(source.selector).each((i, el) => {
        const title = $(el).text().trim();
        const link = $(el).attr("href");

        if (title && link) {
          newsList.push({
            source: source.name,
            title,
            url: link.startsWith("http") ? link : source.base + link
          });
        }
      });
    }

    res.json({ status: "success", count: newsList.length, news: newsList });
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    res.status(500).json({ status: "error", message: "فشل في جلب الأخبار" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FlashNews API running on port ${PORT}`);
});
