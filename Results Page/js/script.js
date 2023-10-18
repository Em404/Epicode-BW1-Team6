let correct = 66.7; 

let wrong = 100 - correct;

let data = [wrong, correct];

let labels = ['Wrong', 'Correct'];

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

ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 40;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;