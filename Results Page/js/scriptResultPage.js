let wrong2 = document.querySelector('#percentualeWrong');
let correctTxt = document.querySelector('#percentualeCorrect');
let txtNumber = correctTxt.textContent;
let correctD = parseFloat(txtNumber);
let correct2 = correctD.toFixed(2);

let correct = correct2;

let wrong = 100 - correct;

let data = [wrong, correct2];

let labels = ['Wrong', 'correct2'];

let colors = ['#D20094', '#00FFFF'];
let borderColor = ['#D20094', '#00FFFF'];

let ctx = document.getElementById('myDoughnutChart').getContext('2d');
let myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: data,
            backgroundColor: colors,
            borderColor: borderColor,
        }]
    },
    options: {
        responsive: false,
        cutout: 120,
    }
});
wrong2.textContent = wrong.toFixed(1);



ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 40;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;