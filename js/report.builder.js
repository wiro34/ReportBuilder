$(document).ready(() => {
  const openImageInNewTab = (e) => {
    const image = new Image();
    image.src = e.target.src;
    image.style = 'width: 100%';
    const w = window.open('');
    w.document.write(image.outerHTML);
  };
  $('.img-open img').click(openImageInNewTab);
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function drawChart(title, chartData) {
  const keys = Object.keys(chartData);
  const dataArray = keys.map((key) => [capitalize(key), chartData[key][0]]);
  const data = google.visualization.arrayToDataTable([
    ['Task', 'Cucumber Results'],
  ].concat(dataArray));
  const total = keys.reduce((total, key) => total + chartData[key][0], 0);
  const chartTitle = total + ' ' + ((total === 1) ? title.slice(0, -1) : title);
  const colors = keys.map((key) => chartData[key][1]);
  const options = {
    width: '100%',
    height: 240,
    title: chartTitle,
    is3D: true,
    tooltip: {trigger: 'selection'},
    colors: colors,
    fontSize: '13',
    fontName: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
    titleTextStyle: {
      fontSize: '13',
      color: '#5e5e5e',
    },
  };

  const chart = new google.visualization.PieChart(
      document.getElementById(title.toLowerCase() + 'Chart'),
  );
  chart.draw(data, options);
}
