fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  headers: {
    "Authorization": "Basic " + btoa("coalition:skills-test")
  }
})
  .then(res => res.json())
  .then(data => {

    // PATIENT LIST
    const patientList = document.getElementById("patient-list");
    data.forEach(p => {
      const div = document.createElement("div");
      div.className = "patient-item" + (p.name === "Jessica Taylor" ? " active" : "");
      div.innerHTML = `
        <img src="${p.profile_picture}" alt="${p.name}">
        <div>
          <div class="name">${p.name}</div>
          <div class="sub">${p.gender}, ${p.age}</div>
        </div>
      `;
      patientList.appendChild(div);
    });

    // JESSICA TAYLOR
    const patient = data.find(p => p.name === "Jessica Taylor");
    if (!patient) return;

    // PROFILE
    document.getElementById("profile-pic").src = patient.profile_picture;
    document.getElementById("profile-name").textContent = patient.name;
    document.getElementById("dob").textContent = patient.date_of_birth;
    document.getElementById("gender").textContent = patient.gender;
    document.getElementById("phone").textContent = patient.phone_number;
    document.getElementById("emergency").textContent = patient.emergency_contact;
    document.getElementById("insurance").textContent = patient.insurance_type;

    // LAB RESULTS
    const labList = document.getElementById("lab-results");
    patient.lab_results.forEach(lab => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${lab}</span><span>⬇️</span>`;
      labList.appendChild(li);
    });

    // DIAGNOSTIC LIST
    const diagList = document.getElementById("diag-list");
    patient.diagnostic_list.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.name}</td>
        <td>${d.description}</td>
        <td>${d.status}</td>
      `;
      diagList.appendChild(tr);
    });

    // VITALS
    const latest = patient.diagnosis_history[0];
    document.getElementById("systolic-val").textContent = latest.blood_pressure.systolic.value;
    document.getElementById("systolic-level").textContent = latest.blood_pressure.systolic.levels;
    document.getElementById("diastolic-val").textContent = latest.blood_pressure.diastolic.value;
    document.getElementById("diastolic-level").textContent = latest.blood_pressure.diastolic.levels;
    document.getElementById("resp-rate").textContent = latest.respiratory_rate.value + " bpm";
    document.getElementById("resp-level").textContent = latest.respiratory_rate.levels;
    document.getElementById("temperature").textContent = latest.temperature.value + "°F";
    document.getElementById("temp-level").textContent = latest.temperature.levels;
    document.getElementById("heart-rate").textContent = latest.heart_rate.value + " bpm";
    document.getElementById("heart-level").textContent = latest.heart_rate.levels;

    // BP CHART
    const last6 = patient.diagnosis_history.slice(0, 6).reverse();
    const labels = last6.map(d => d.month + " " + d.year);
    const systolicData = last6.map(d => d.blood_pressure.systolic.value);
    const diastolicData = last6.map(d => d.blood_pressure.diastolic.value);

    new Chart(document.getElementById("bpChart"), {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Systolic",
            data: systolicData,
            borderColor: "#c26eb4",
            backgroundColor: "rgba(194,110,180,0.1)",
            tension: 0.4,
            pointBackgroundColor: "#c26eb4"
          },
          {
            label: "Diastolic",
            data: diastolicData,
            borderColor: "#7b9fd4",
            backgroundColor: "rgba(123,159,212,0.1)",
            tension: 0.4,
            pointBackgroundColor: "#7b9fd4"
          }
        ]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { min: 60, max: 180 } }
      }
    });

  })
  .catch(err => console.log("Error:", err));
