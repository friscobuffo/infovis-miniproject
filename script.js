/*
Crea un file json con dei dati multivariati: ci sono 10 data-cases e
ogni data-case ha cinque variabili quantitative i cui valori sono tutti
positivi. In base a questi dati disegna 10 triangoli isosceli nell'area
di disegno (ogni triangolo corrisponde ad un data-case). La prima
variabile determina la posizione orizzontale del triangolo, la seconda
variabile la posizione verticale, la terza variabile la base, la quarta
variabile l'altezza, la quinta variabile la tonalità del riempimento.
Facendo click con il pulsante sinistro su un triangolo questo rimane
selezionato. Facendo click su un secondo triangolo questo scambia i
valori delle variabili (con l'eccezione della x e della y e del colore)
con quelle del triangolo selezionato. Fai in modo che i cambi di
dimensioni dei triangoli avvengano con un'animazione fluida. Usa le
scale d3.js per mappare l'intervallo dei valori delle variabili (che
deve essere arbitrario) sull'intervallo dei valori delle coordinate, che
dipende dalla tua interfaccia.
*/

let xScale = d3.scaleLinear();
let yScale = d3.scaleLinear();
let heightScale = d3.scaleLinear();

const xDomain = [0, 1000];
const yDomain = [0, 800];
xScale.domain(xDomain);
yScale.domain(yDomain);
heightScale.domain(yDomain);

function buildTriangle(triangle) {
    let x = parseFloat(xScale(triangle.x));
    let y = parseFloat(yScale(triangle.y));
    let base = parseFloat(xScale(triangle.base));
    let height = parseFloat(heightScale(triangle.height));
    return `${x},${y} ${x+base},${y} ${x+(base/2)},${y-height}`;
}

function updateBoard(svgBoard, data) {
    svgBoard.selectAll("polygon")
        .data(data)
        .transition()
        .duration(750)
        .attr("points", buildTriangle)
        .duration(250)
        .attr("stroke-width", function(triangle) {
            if (triangle.hasEdge) return 3;
            return 0;
        });
}

let lastClickedTriangle = null;

function fillBoard(svgBoard, data) {
    svgBoard.selectAll("polygon")
        .data(data)
        .enter()
        .append("polygon")
        .attr("fill", function(triangle) {
            return `hsl(${triangle.hue}, 100%, 50%)`;
        })
        .attr("stroke", "black")
        .attr("points", buildTriangle)
        .attr("stroke-width", 0)
        .on("click", function(event, triangle) {
            if (lastClickedTriangle == null) {
                lastClickedTriangle = triangle;
                triangle.hasEdge = true;
                updateBoard(svgBoard, data);
            }
            else {
                lastClickedTriangle.hasEdge = false;
                let base1 = lastClickedTriangle.base;
                let height1 = lastClickedTriangle.height;
                let base2 = triangle.base;
                let height2 = triangle.height;
                triangle.base = base1;
                triangle.height = height1;
                lastClickedTriangle.base = base2;
                lastClickedTriangle.height = height2;
                lastClickedTriangle = null;
                updateBoard(svgBoard, data);
            }
        });
}

d3.json("data.json")
    .then(function(data) {
        const boardHeight = Math.floor(0.8*window.screen.height);
        const boardWidth = Math.floor(0.8*window.screen.width);

        let svgBoard = d3.select("#svg-board");
        svgBoard.attr("width", boardWidth);
        svgBoard.attr("height", boardHeight);

        xScale.range([0, boardWidth]);
        yScale.range([boardHeight, 0]);
        heightScale.range([0, boardHeight]);

        fillBoard(svgBoard, data);
    })
    .catch(error => console.log(error));