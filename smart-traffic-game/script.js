// 获取背景音乐元素
const bgMusic = document.getElementById("bgMusic");

// 开始答题时播放音乐
function startQuiz(module) {
    currentModule = module;
    currentQuestions = getRandomQuestions(module);
    currentQuestionIndex = 0;
    score = 0;
    main.style.display = "none";
    quiz.style.display = "block";
    bgMusic.play(); // 播放背景音乐
    showQuestion();
}



// 题目数据
const questions = {
    road: [
        { question: "智慧的路是什么？", options: ["选项A", "选项B", "选项C", "选项D"], answer: "选项A" },
        { question: "智慧的路的主要功能是什么？", options: ["交通监控", "自动修路", "天气预报", "娱乐设施"], answer: "交通监控" },
        // 添加更多题目...
    ],
    car: [
        { question: "聪明的车是什么？", options: ["自动驾驶汽车", "普通汽车", "自行车", "火车"], answer: "自动驾驶汽车" },
        { question: "聪明的车的主要特点是什么？", options: ["自动避障", "手动驾驶", "需要司机", "速度慢"], answer: "自动避障" },
        // 添加更多题目...
    ],
    safety: [
        { question: "安全出行需要注意什么？", options: ["遵守交通规则", "随意变道", "超速行驶", "疲劳驾驶"], answer: "遵守交通规则" },
        { question: "以下哪种行为是安全的？", options: ["系好安全带", "开车玩手机", "酒后驾驶", "闯红灯"], answer: "系好安全带" },
        // 添加更多题目...
    ]
};

let currentModule = "";
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let scores = [];

// 获取元素
const main = document.getElementById("main");
const quiz = document.getElementById("quiz");
const leaderboard = document.getElementById("leaderboard");
const questionText = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoresList = document.getElementById("scoresList");
const backBtn = document.getElementById("backBtn");

// 主界面按钮点击事件
document.getElementById("roadBtn").addEventListener("click", () => startQuiz("road"));
document.getElementById("carBtn").addEventListener("click", () => startQuiz("car"));
document.getElementById("safetyBtn").addEventListener("click", () => startQuiz("safety"));

// 开始答题
function startQuiz(module) {
    currentModule = module;
    currentQuestions = getRandomQuestions(module);
    currentQuestionIndex = 0;
    score = 0;
    main.style.display = "none";
    quiz.style.display = "block";
    showQuestion();
}

// 显示题目
function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    options.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        options.appendChild(button);
    });
}

// 检查答案
function checkAnswer(selectedOption) {
    const question = currentQuestions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score += 10; // 答对加10分
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

// 结束答题
function endQuiz() {
    quiz.style.display = "none";
    leaderboard.style.display = "block";
    updateLeaderboard();
}

// 更新排行榜
function updateLeaderboard() {
    scores.push({ user: "玩家1", score });
    scores.sort((a, b) => b.score - a.score);
    scoresList.innerHTML = "";
    scores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.user}: ${entry.score}分`;
        scoresList.appendChild(li);
    });
}

// 返回主界面
backBtn.addEventListener("click", () => {
    leaderboard.style.display = "none";
    main.style.display = "block";
});

// 随机抽取题目
function getRandomQuestions(module) {
    const allQuestions = questions[module];
    return allQuestions.sort(() => Math.random() - 0.5).slice(0, 4);
}