const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 连接 MongoDB
mongoose.connect("mongodb://localhost:27017/smart_traffic_game", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 定义分数模型
const scoreSchema = new mongoose.Schema({
    user: String,
    score: Number,
    timestamp: { type: Date, default: Date.now },
});

const Score = mongoose.model("Score", scoreSchema);

// 上传分数
app.post("/scores", async (req, res) => {
    const { user, score } = req.body;
    const newScore = new Score({ user, score });
    await newScore.save();
    res.status(201).send("分数上传成功");
});

// 获取排行榜
app.get("/scores", async (req, res) => {
    const scores = await Score.find().sort({ score: -1 }).limit(10);
    res.status(200).json(scores);
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});