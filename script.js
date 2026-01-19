const tbody = document.querySelector("#courseTable tbody");

addRow();
addRow();

function addRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="number" min="1" value="3" class="credit"></td>
        <td><input type="number" min="0" max="100" class="marks" oninput="updateRow(this)"></td>
        <td><span class="letter">-</span></td>
        <td><span class="gp">0.00</span></td>
        <td><button class="remove-btn" onclick="removeRow(this)">X</button></td>
    `;

    tbody.appendChild(tr);
}

function removeRow(btn) {
    btn.closest("tr").remove();
}

function resetAll() {
    tbody.innerHTML = "";
    addRow();
    addRow();
    document.getElementById("totalCredits").innerText = "0";
    document.getElementById("totalPoints").innerText = "0.00";
    document.getElementById("cgpa").innerText = "0.00";
}

function getGrade(marks) {
    if (marks >= 90 && marks <= 100) return ["A", 4.00];
    else if (marks >= 86) return ["A-", 3.67];
    else if (marks >= 82) return ["B+", 3.33];
    else if (marks >= 78) return ["B", 3.00];
    else if (marks >= 74) return ["B-", 2.67];
    else if (marks >= 70) return ["C+", 2.33];
    else if (marks >= 66) return ["C", 2.00];
    else if (marks >= 62) return ["C-", 1.67];
    else if (marks >= 58) return ["D+", 1.33];
    else if (marks >= 55) return ["D", 1.00];
    else if (marks >= 0) return ["F", 0.00];
    else return ["-", 0.00];
}

function updateRow(input) {
    const tr = input.closest("tr");
    let marks = parseFloat(input.value);

    const letterSpan = tr.querySelector(".letter");
    const gpSpan = tr.querySelector(".gp");

    if (marks < 0 || marks > 100 || isNaN(marks)) {
        letterSpan.innerText = "-";
        gpSpan.innerText = "0.00";
        return;
    }

    const [letter, gp] = getGrade(marks);
    letterSpan.innerText = letter;
    gpSpan.innerText = gp.toFixed(2);
}

function calculateCGPA() {
    let totalCredits = 0;
    let totalPoints = 0;

    const rows = tbody.querySelectorAll("tr");

    rows.forEach(row => {
        const credit = parseFloat(row.querySelector(".credit").value) || 0;
        const gp = parseFloat(row.querySelector(".gp").innerText) || 0;

        totalCredits += credit;
        totalPoints += credit * gp;
    });

    let cgpa = totalCredits ? (totalPoints / totalCredits) : 0;

    document.getElementById("totalCredits").innerText = totalCredits;
    document.getElementById("totalPoints").innerText = totalPoints.toFixed(2);
    document.getElementById("cgpa").innerText = cgpa.toFixed(2);
}
