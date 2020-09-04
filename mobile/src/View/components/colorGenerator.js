export default function getRandomColor() {
  var colors = [
    "#426d49",
    "#cce134",
    "#f4908c",
    "#fbd502",
    "#ff593e",
    "#fe8525",
    "#00c971",
    "#0097db",
    "#9e49ae",
    "#5226a5",
  ];

  return colors[Math.floor(Math.random() * 10)];
}
