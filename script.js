fetch("https://cors-anywhere.herokuapp.com/https://fedskillstest.coalitiontechnologies.workers.dev")
.then(res => res.json())
.then(data => {

    const patient = data.find(p => p.name === "Jessica Taylor");

    document.getElementById("patient-info").innerHTML = `
        <h2>${patient.name}</h2>
        <p>Gender: ${patient.gender}</p>
        <p>Age: ${patient.age}</p>
        <p>Blood Type: ${patient.blood_type}</p>
    `;

    const bpData = patient.diagnosis_history.map(item => item.blood_pressure.systolic.value);
    const labels = patient.diagnosis_history.map(item => item.month);

    new Chart(document.getElementById("bpChart"), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Blood Pressure',
                data: bpData,
                borderWidth: 2
            }]
        }
    });

});
