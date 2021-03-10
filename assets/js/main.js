// Reproduction Rate
let infRateSlider = document.getElementById("myRange1");
let infRateOutput = document.getElementById("myRange1Value");
let infRateName = document.getElementById("myRange1Name");
infRateOutput.innerHTML = infRateSlider.value; 
infRateName.innerHTML = "Reproduction Number";
let infInputBar = document.getElementById("myRange1bar");

// Population
let plpSlider = document.getElementById("myRange2");
let plpOutput = document.getElementById("myRange2Value");
let plpName = document.getElementById("myRange2Name");
plpOutput.innerHTML =  plpSlider.value;
plpName.innerHTML = "Population";

// Initialize the graph
chartShow(2);

// Udate the curren input value (each time you type in it)
infInputBar.oninput = function() {
    infRateSlider.value = this.value;
    infRateOutput.innerHTML = this.value;

    chartShow(this.value);
}

// Update the current slider value (each time you drag the slider handle)
infRateSlider.oninput = function() {
    infInputBar.value = this.value;
    infRateOutput.innerHTML = this.value;    
    
    chartShow(this.value);
}

plpSlider.oninput = function() {
    plpOutput.innerHTML = this.value;
  }

function changeText() {
    document.getElementById("change").innerHTML = "Hejsa";
}

function chartShow(infTal){
    var ctx = document.getElementById("myChart");
    var data = {
        labels: [1, infTal],
        datasets: [{
            label: "f(x) = x",
            function: function(x) { return x },
            borderColor: "blue",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x²",
            function: function(x) { return x*x },
            borderColor: "red",
            data: [],
            fill: false
        },
        {
            label: "f(x) = x * log(x)",
            function: function(x) { return x*Math.log(x) },
            borderColor: "black",
            data: [],
            fill: false
        }]
    };

    Chart.pluginService.register({
        beforeInit: function(chart) {
            var data = chart.config.data;
            for (var i = 0; i < data.datasets.length; i++) {
                for (var j = 0; j < data.labels.length; j++) {
                    var fct = data.datasets[i].function,
                        x = data.labels[j],
                        y = fct(x);
                    data.datasets[i].data.push(y);
                }
            }
        }
    });

    var myBarChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
