const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use;
app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});
app.get("/write", (req, res) => {
  const posts = [];
  for (let i = 0; i < 10; i = i + 1) {
    posts.push({
      id: i,
      title: `test title ${i}`,
      content: `contnet ${i}`,
    });
  }
  fs.writeFileSync("test.json", JSON.stringify({ data: posts }));
  res.send("<h1>test.json 파일 생성 성공</h1>");
});

// 퀴즈
// test.json 에서 파일을 읽어서 (author 정보를 추가해서)
// json 형태로 브라우저에 출력
app.get("/list", (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");

  const result = JSON.parse(data).data.map((post) => ({
    ...post,
    author: {
      name: "홍길동",
      email: "h1@gmail.com",
    },
  }));
  res.status(200).json({ data: result });
});

app.get("/view/:id", (req, res) => {
  const id = req.params.id;
  const data = fs.readFileSync("test.json", "utf-8");
  const jsonObj = JSON.parse(data);
  const posts = jsonObj["data"];
  const selectedPost = posts.filter((item) => {
    return item.id == id;
  });
  res.json({ data: selectedPost[0] });
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}포트에서 시작되었습니다.`);
});
