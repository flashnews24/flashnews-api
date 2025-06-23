const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/main.json", (req, res) => {
  res.json([
    {
      title: "مثال على خبر عاجل",
      summary: "هذا مجرد مثال لعرض شكل الخبر في الواجهة.",
      link: "https://www.example.com",
      source: "العربية",
      published_at: new Date().toISOString(),
      image: "https://via.placeholder.com/300x160.png?text=News"
    }
  ]);
});

app.get("/", (req, res) => {
  res.send("✅ FlashNews API يعمل!");
});

app.listen(PORT, () => {
  console.log(`✅ FlashNews API يعمل على http://localhost:${PORT}`);
});