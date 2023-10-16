

const config = {
    SERVER_API: "https://x2tqr6-8080.csb.app/data/", 
};

const client = {
    send: async function (url, method = "GET", body = null) {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        const data = await response.json();
        return { response, data };
    },
    get: function (url) {
        return this.send(url);
    },
};

const startButton = document.querySelector(".start-game");
const main = document.querySelector(".main");
const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.querySelector(".next");
const restartButton = document.querySelector(".restart");
let currentQuestionIndex = 0;
let score = 0;

let questions = []; // Lưu trữ câu hỏi đã lấy từ máy chủ

startButton.addEventListener("click", async function () {
    startButton.classList.add("none");
    main.classList.remove("none");

    // Ẩn nút "Chơi lại"
    restartButton.style.display = "none";

    // Lấy câu hỏi và lưu chúng vào mảng 'questions'
    try {
        const response = await client.get(`${config.SERVER_API}`);
        questions = response.data;

        // Hiển thị câu hỏi đầu tiên
        displayQuestion(currentQuestionIndex);
    } catch (error) {
        console.error("Lỗi khi lấy câu hỏi:", error);
    }
});

nextButton.addEventListener("click", function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        // Trò chơi đã kết thúc, hiển thị số điểm hoặc bất kỳ thông báo nào bạn muốn
        questionElement.innerHTML = `Kết thúc trò chơi! Số điểm của bạn: ${score}`;
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";

        // Hiển thị nút "Chơi lại"
        restartButton.style.display = "block";
    }
});

restartButton.addEventListener("click", function () {
    // Đặt lại điểm và chỉ số câu hỏi về giá trị ban đầu
    score = 0;
    currentQuestionIndex = 0;

    // Ẩn nút "Chơi lại" và hiển thị nút "Tiếp theo"
    restartButton.style.display = "none";
    nextButton.style.display = "block";

    // Xóa thông báo kết thúc trò chơi
    questionElement.innerHTML = "";

    // Xóa nội dung của khung chọn lựa
    optionsContainer.innerHTML = "";

    // Hiển thị câu hỏi đầu tiên
    displayQuestion(currentQuestionIndex);
});

function displayQuestion(index) {
    const questionData = questions[index];
    questionElement.textContent = questionData.question;

    // Xóa nội dung của khung chọn lựa
    optionsContainer.innerHTML = "";

    // Tạo các nút lựa chọn
    for (const [key, value] of Object.entries(questionData.options)) {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option");
        optionButton.textContent = `${key}: ${value}`;
        optionButton.addEventListener("click", () => checkAnswer(questionData, key));
        optionsContainer.appendChild(optionButton);
    }
}

function checkAnswer(questionData, selectedOption) {
    const correctAnswer = questionData.answer;

    if (correctAnswer === selectedOption) {
        // Câu trả lời đúng
        score += 2; // Tăng điểm lên 1 (bạn có thể thay đổi cách tính điểm)
    }

    // Vô hiệu hóa tất cả nút lựa chọn sau khi chọn một câu trả lời
    const optionButtons = document.querySelectorAll(".option");
    optionButtons.forEach((button) => {
        button.disabled = true;
    });

    // Hiển thị nút "Tiếp theo"
    nextButton.style.display = "block";
}


