const tbody = document.querySelector("#courseTable tbody");

addRow();
addRow();

function addRow() {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="number" value="3" min="1"></td>
        <td><input type="number" min="0" max="100" oninput="updateGrade(this)"></td>
        <td><span class="letter">-</span></td>
        <td><span class="gp">0.00</span></td>
        <td><button class="remove-btn" onclick="removeRow(this)">X</button></td>
    `;

    tbody.appendChild(row);
}

function removeRow(btn) {
    btn.closest("tr").remove();
}

function resetAll() {
    tbody.innerHTML = "";
    addRow();
    addRow();
    document.getElementById("totalCredits").textContent = "0";
    document.getElementById("totalPoints").textContent = "0.00";
    document.getElementById("cgpa").textContent = "0.00";
    document.getElementById("cgpaMessage").textContent = "";
}

function updateGrade(input) {
    let marks = parseInt(input.value);
    const row = input.closest("tr");
    const letter = row.querySelector(".letter");
    const gp = row.querySelector(".gp");

    let g = 0, l = "-";

    if (isNaN(marks) || marks < 0 || marks > 100) {
        l = "Invalid"; g = 0;
    }
    else if (marks >= 90) { l = "A"; g = 4.00; }
    else if (marks >= 86) { l = "A-"; g = 3.67; }
    else if (marks >= 82) { l = "B+"; g = 3.33; }
    else if (marks >= 78) { l = "B"; g = 3.00; }
    else if (marks >= 74) { l = "B-"; g = 2.67; }
    else if (marks >= 70) { l = "C+"; g = 2.33; }
    else if (marks >= 66) { l = "C"; g = 2.00; }
    else if (marks >= 62) { l = "C-"; g = 1.67; }
    else if (marks >= 58) { l = "D+"; g = 1.33; }
    else if (marks >= 55) { l = "D"; g = 1.00; }
    else { l = "F"; g = 0.00; }

    letter.textContent = l;
    gp.textContent = g.toFixed(2);
}

function calculateCGPA() {
    let totalCredits = 0;
    let totalPoints = 0;

    document.querySelectorAll("#courseTable tbody tr").forEach(row => {
        const credit = parseFloat(row.children[0].querySelector("input").value) || 0;
        const gp = parseFloat(row.querySelector(".gp").textContent) || 0;

        totalCredits += credit;
        totalPoints += credit * gp;
    });

    let cgpa = totalCredits ? (totalPoints / totalCredits) : 0;

    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("totalPoints").textContent = totalPoints.toFixed(2);
    document.getElementById("cgpa").textContent = cgpa.toFixed(2);

    const msg = document.getElementById("cgpaMessage");

    if (cgpa >= 3.75) msg.textContent = "🌟 Excellent! Keep it up!";
    else if (cgpa >= 3.25) msg.textContent = "👏 Very Good performance!";
    else if (cgpa >= 2.75) msg.textContent = "🙂 Good, but you can do better!";
    else if (cgpa >= 2.0) msg.textContent = "⚠️ Average, focus more!";
    else if (cgpa > 0) msg.textContent = "❗ Needs serious improvement!";
    else msg.textContent = "";
}
