const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// الصفحة الرئيسية للتأكيد أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("✅ FlashNews API يعمل!");
});

// الراوت الرئيسي لجلب الأخبار
app.get("/api/news", async (req, res) => {
  try {
    const response = await fetch("https://raw.githubusercontent.com/flashnews24/news/main/news.json");
    const data = await response.json();
    res.json({ news: data });
  } catch (error) {
    console.error("❌ فشل جلب الأخبار:", error);
    res.status(500).json({ error: "فشل جلب الأخبار." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ FlashNews API يعمل على المنفذ ${PORT}`);
});
