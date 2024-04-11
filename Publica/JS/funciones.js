const titulo = document.querySelector("h1");

setInterval(() => {
    //Color random cada 2 segundos (2000)
    titulo.style.color = `rgb(${[0,0,0].map(() => Math.floor(Math.random() * 256)).join(",")})`;
}, 2000);