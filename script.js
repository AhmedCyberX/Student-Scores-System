let students = [
    { name: "Ahmed", score: 92, grade: "A", status: "Excellent" },
    { name: "Sara", score: 84, grade: "B", status: "Very Good" },
    { name: "Omar", score: 75, grade: "C", status: "Fair" },
    { name: "Hana", score: 45, grade: "F", status: "Fail" }
];
function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 50) {
        return "D";
    } else {
        return "F";
    }
}
function getStatus(grade) {
    let result = "";
    switch (grade) {
        case "A":
            result = "Excellent";
            break;
        case "B":
            result = "Very Good";
            break;
        case "C":
            result = "Fair";
            break;
        case "D":
            result = "Poor";
            break;
        case "F":
            result = "Fail";
            break;
        default:
            result = "Invalid grade";
    }
    return result;
}
function displayStudents(list) {
    let html = "";
    for (let student of list) {
        html += `<li><strong>${student.name}</strong> - Score: ${student.score} | Grade: ${student.grade} (${student.status})</li>`;
    }
    document.querySelector("#studentList").innerHTML = html;
}
function updateStats() {
    let count = students.length;
    if (count == 0) {
        document.querySelector("#countText").textContent = "Total Students: 0";
        document.querySelector("#sumText").textContent = "Sum of Scores: 0";
        document.querySelector("#avgText").textContent = "Average Score: 0";
        document.querySelector("#maxText").textContent = "Highest Score: 0";
        document.querySelector("#minText").textContent = "Lowest Score: 0";
        document.querySelector("#passText").textContent = "Passed Students (>= 50): 0";
        return;
    }
    let sum = 0;
    let largest = students[0].score;
    let smallest = students[0].score;
    let passed = 0;
    for (let i = 0; i < count; i++) {
        let currentScore = students[i].score;
        sum += currentScore;

        if (currentScore > largest) {
            largest = currentScore;
        }
        if (currentScore < smallest) {
            smallest = currentScore;
        }
        if (currentScore >= 50) {
            passed += 1;
        }
    }
    let avg = sum / count;
    document.querySelector("#countText").textContent = "Total Students: " + count;
    document.querySelector("#sumText").textContent = "Sum of Scores: " + sum;
    document.querySelector("#avgText").textContent = "Average Score: " + avg;
    document.querySelector("#maxText").textContent = "Highest Score: " + largest;
    document.querySelector("#minText").textContent = "Lowest Score: " + smallest;
    document.querySelector("#passText").textContent = "Passed Students (>= 50): " + passed;
}
let scoreForm = document.querySelector("#scoreForm");
scoreForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let nameInput = document.querySelector("#studentName");
    let scoreInput = document.querySelector("#studentScore");
    let message = document.querySelector("#message");
    let name = nameInput.value;
    let score = scoreInput.value * 1;
    if (name == "" || scoreInput.value == "") {
        message.textContent = "Please enter both student name and score.";
        return;
    }
    if (!(score >= 0 && score <= 100)) {
        message.textContent = "Please enter a valid score between 0 and 100.";
        return;
    }
    let grade = getGrade(score);
    let status = getStatus(grade);

    let newStudent = {
        name: name,
        score: score,
        grade: grade,
        status: status
    };
    students.push(newStudent);
    nameInput.value = "";
    scoreInput.value = "";
    message.textContent = "";
    displayStudents(students);
    updateStats();
});
let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keyup", function(event) {
    let query = searchInput.value.toLowerCase();
    let html = "";
    if (query != "") {
        for (let student of students) {
            if (student.name.toLowerCase().startsWith(query)) {
                html += `<li><strong>${student.name}</strong> - Score: ${student.score} | Grade: ${student.grade} (${student.status})</li>`;
            }
        }
        document.querySelector("#studentList").innerHTML = html;
    } else {
        displayStudents(students);
    }
});
document.querySelector("#sortBtn").addEventListener("click", function() {
    let n = students.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (students[j].score > students[j + 1].score) {
                let temp = students[j];
                students[j] = students[j + 1];
                students[j + 1] = temp;
            }
        }
    }
    displayStudents(students);
});
document.querySelector("#reverseBtn").addEventListener("click", function() {
    students.reverse();
    displayStudents(students);
});
document.querySelector("#removeLastBtn").addEventListener("click", function() {
    if (students.length > 0) {
        students.pop();
        displayStudents(students);
        updateStats();
    }
});
let body = document.querySelector("body");
document.querySelector("#whiteBtn").addEventListener("click", function() {
    body.style.backgroundColor = "white";
});
document.querySelector("#grayBtn").addEventListener("click", function() {
    body.style.backgroundColor = "#dcdcdc";
});
document.querySelector("#yellowBtn").addEventListener("click", function() {
    body.style.backgroundColor = "#fff9db";
});
displayStudents(students);
updateStats();