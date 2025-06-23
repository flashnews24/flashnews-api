// server.js

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// تمكين CORS للسماح بالوصول من موقع الواجهة
app.use(cors());

// مسار الجذر
app.get("/", (req, res) => {
  res.send("✅ FlashNews API يعمل!");
});

// مسار API للأخبار
app.get("/api/news", async (req, res) => {
  // بيانات أخبار تجريبية (يمكنك ربطها بمصدر لاحقًا)
  const news = [
    {
      title: "عاجل: انفجار في منطقة وسط المدينة",
      source: "الجزيرة",
      category: "محلي",
      date: new Date(),
    },
    {
      title: "أسعار النفط ترتفع بنسبة 2%",
      source: "العربية",
      category: "اقتصاد",
      date: new Date(),
    },
    {
      title: "فوز الهلال على النصر في مباراة مثيرة",
      source: "سكاي نيوز عربية",
      category: "رياضة",
      date: new Date(),
    },
  ];

  // إرسال الأخبار كـ JSON
  res.json({ news });
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`⚡ FlashNews API يعمل على المنفذ ${port}`);
});
