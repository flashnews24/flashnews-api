const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// مثال على قنوات إخبارية عربية
const sources = [
  {
    name: "Al Jazeera",
    url: "https://www.aljazeera.net/aljazeera/rss", // مثال: تحتاج تستخدم RSS parsing لاحقاً
  },
  {
    name: "Al Arabiya",
    url: "https://www.alarabiya.net/.mrss/ar.xml", // مثال
  },
];

// نقطة رئيسية لجلب الأخبار (تحديث لاحق: ممكن نستخدم RSS إلى JSON API خارجي)
app.get("/news", async (req, res) => {
  try {
    // هذا مثال ثابت حتى الآن - لاحقاً نربط بـ RSS Parser أو API
    const news = [
      {
        title: "خبر عاجل من الجزيرة",
        source: "Al Jazeera",
        url: "https://www.aljazeera.net/",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "أخبار من العربية",
        source: "Al Arabiya",
        url: "https://www.alarabiya.net/",
        publishedAt: new Date().toISOString(),
      },
    ];

    res.json({ status: "ok", articles: news });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/", (req, res) => {
  res.send("FlashNews API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
