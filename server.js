const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// اختبار بسيط للتأكد من أن السيرفر يعمل
app.get("/", (req, res) => {
  res.send("🚀 Flash News API is running!");
});

// مثال على جلب الأخبار من مصدر معين (تقدر تعدلها لاحقًا)
app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get("https://www.aljazeera.net/xml/rss/all.xml"); // مثال: الجزيرة
    res.send(response.data);
  } catch (error) {
    console.error("حدث خطأ أثناء جلب الأخبار:", error.message);
    res.status(500).send("فشل في جلب الأخبار");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Flash News API is running on port ${PORT}`);
});
