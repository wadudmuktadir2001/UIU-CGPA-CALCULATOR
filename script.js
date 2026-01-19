const tbody = document.querySelector("#courseTable tbody");

addRow();
addRow();

/* ---------------- ADD ROW ---------------- */
function addRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td><input type="number" min="1" value="3" class="credit"></td>
        <td><input type="number" min="0" max="100" class="marks" oninput="updateGrade(this)"></td>
        <td><span class="badge letter">-</span></td>
        <td><span class="badge gp">0.00</span></td>
        <td><button class="remove" onclick="removeRow(this)">X</button></td>
    `;

    tbody.appendChild(tr);
}

/* ---------------- REMOVE ROW ---------------- */
function removeRow(btn) {
    btn.closest("tr").remove();
}

/* ---------------- RESET ---------------- */
function resetAll() {
    tbody.innerHTML = "";
    addRow();
    addRow();

    document.getElementById("totalCredits").textContent = "0";
    document.getElementById("totalPoints").textContent = "0.00";
    document.getElementById("cgpa").textContent = "0.00";
}

/* ---------------- UPDATE GRADE ---------------- */
function updateGrade(input) {
    let marks = parseInt(input.value);
    const row = input.closest("tr");
    const letterSpan = row.querySelector(".letter");
    const gpSpan = row.querySelector(".gp");

    let letter = "-";
    let gp = 0;

    // validation
    if (isNaN(marks) || marks < 0 || marks > 100) {
        letter = "Invalid";
        gp = 0;
        input.style.border = "2px solid red";
    }
    else {
        input.style.border = "none";

        if (marks >= 90) { letter = "A"; gp = 4.00; }
        else if (marks >= 86) { letter = "A-"; gp = 3.67; }
        else if (marks >= 82) { letter = "B+"; gp = 3.33; }
        else if (marks >= 78) { letter = "B"; gp = 3.00; }
        else if (marks >= 74) { letter = "B-"; gp = 2.67; }
        else if (marks >= 70) { letter = "C+"; gp = 2.33; }
        else if (marks >= 66) { letter = "C"; gp = 2.00; }
        else if (marks >= 62) { letter = "C-"; gp = 1.67; }
        else if (marks >= 58) { letter = "D+"; gp = 1.33; }
        else if (marks >= 55) { letter = "D"; gp = 1.00; }
        else { letter = "F"; gp = 0.00; }
    }

    letterSpan.textContent = letter;
    gpSpan.textContent = gp.toFixed(2);
}

/* ---------------- CALCULATE CGPA ---------------- */
function calculateCGPA() {
    const rows = tbody.querySelectorAll("tr");

    let totalCredits = 0;
    let totalPoints = 0;
    let hasInvalid = false;

    rows.forEach(row => {
        const credit = parseFloat(row.querySelector(".credit").value) || 0;
        const gpText = row.querySelector(".gp").textContent;
        const letter = row.querySelector(".letter").textContent;

        if (letter === "Invalid") {
            hasInvalid = true;
        }

        const gp = parseFloat(gpText) || 0;

        totalCredits += credit;
        totalPoints += credit * gp;
    });

    if (hasInvalid) {
        alert("❌ Please fix invalid marks (0–100 only) before calculating CGPA.");
        return;
    }

    const cgpa = totalCredits ? (totalPoints / totalCredits) : 0;

    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("totalPoints").textContent = totalPoints.toFixed(2);
    document.getElementById("cgpa").textContent = cgpa.toFixed(2);
}
