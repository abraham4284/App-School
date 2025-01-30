const anioActual = new Date().getFullYear();
const meses = [
  "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const cuotas = [];

for (let i = 0; i < 10; i++) {
  const mesIndex = i + 2; // Marzo es el mes 2 (0-based index)
  const nCuotas = i + 1;
  
  const fechaInicio = new Date(anioActual, mesIndex, 1);
  const fechaVencimiento = new Date(anioActual, mesIndex, 10);


  cuotas.push({
    nCuotas: nCuotas,
    mes: meses[i],
    fechaInicio: fechaInicio.toISOString().slice(0, 10),
    fechaVencimiento: fechaVencimiento.toISOString().slice(0, 10)
  });
}

const generarNumeroDeOperacion = () => {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };
  
console.log(generarNumeroDeOperacion());
