const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// تفعيل CORS للسماح لأي موقع باستخدام الـ API
app.use(cors());

const newsData = [
  {
    title: "خبر عاجل من الجزيرة",
    source: "الجزيرة",
    category: "عالمي",
    date: new Date()
  },
  {
    title: "تحديث اقتصادي من العربية",
    source: "العربية",
    category: "اقتصاد",
    date: new Date()
  },
  {
    title: "أخبار رياضية من بي إن سبورت",
    source: "بي إن سبورت",
    category: "رياضة",
    date: new Date()
  },
  {
    title: "تقرير تقني من سكاي نيوز",
    source: "سكاي نيوز",
    category: "تكنولوجيا",
    date: new Date()
  },
];

app.get('/', (req, res) => {
  res.send('✅ FlashNews API يعمل!');
});

app.get('/api/news', (req, res) => {
  res.json({ news: newsData });
});

app.listen(port, () => {
  console.log(`✅ FlashNews API يعمل على http://localhost:${port}`);
});
