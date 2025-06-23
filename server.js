const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

const news = [
  {
    title: '📢 عاجل: بدء تنفيذ مشروع Flash News',
    source: 'FlashNews',
    category: 'محلي',
    date: '2025-06-23T05:00:00Z'
  },
  {
    title: '⚽ منتخب السعودية يفوز على اليابان 3-1',
    source: 'الرياضية',
    category: 'رياضة',
    date: '2025-06-23T03:00:00Z'
  }
];

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    news: news
  });
});

app.listen(port, () => {
  console.log(`✅ FlashNews API is live on http://localhost:${port}`);
});
