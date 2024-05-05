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

function script(data) {
    console.log(data[0]);
}

d3.json("data.json")
    .then(script)
    .catch(error => console.log(error));