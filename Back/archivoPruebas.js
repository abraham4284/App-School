

const intereses = [
  { idIntereses: 1, porcentaje: "15.00", dias: 10 },
  { idIntereses: 2, porcentaje: "20.00", dias: 15 },
];

const data = [
  {
    idDetalleCuota: 12,
    numCuota: 1,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-03-01",
    fechaVencimiento: "2024-03-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: 1,
  },
  {
    idDetalleCuota: 13,
    numCuota: 2,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-04-01",
    fechaVencimiento: "2024-04-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: 2,
  },
  {
    idDetalleCuota: 14,
    numCuota: 3,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-05-01",
    fechaVencimiento: "2024-05-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 15,
    numCuota: 4,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-06-01",
    fechaVencimiento: "2024-06-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 16,
    numCuota: 5,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-07-01",
    fechaVencimiento: "2024-07-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 17,
    numCuota: 6,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-08-01",
    fechaVencimiento: "2024-08-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 18,
    numCuota: 7,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-09-01",
    fechaVencimiento: "2024-09-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 19,
    numCuota: 8,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-10-01",
    fechaVencimiento: "2024-10-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 20,
    numCuota: 9,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-11-01",
    fechaVencimiento: "2024-11-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
  {
    idDetalleCuota: 21,
    numCuota: 10,
    montoUnitario: "15000.00",
    recargo: 0,
    valorFinalCuota: 0,
    fechaInicio: "2024-12-01",
    fechaVencimiento: "2024-12-10",
    fechaDelPago: null,
    montoPag: null,
    estado: "PENDIENTE",
    NOperacion: null,
    idCuotas: 4,
    idMedioDePago: null,
    idIntereses: null,
  },
];

const calcularDiasAtrasos = (fecha) => {
  if (!fecha) return;
  const fechaVencimiento = new Date(fecha);
  const fechaActual = new Date();
  const diferenciaMilisegundos = fechaVencimiento - fechaActual;
  const diferenciaDias = Math.ceil(
    diferenciaMilisegundos / (1000 * 60 * 60 * 24) + 1
  );

  // return {
  //   diferenciaDias,
  // };
  return diferenciaDias;
};

// console.log(calcularDiasAtrasos("2025-01-18"));

const porcentaje = intereses.length > 0 ? intereses[0].porcentaje : {};
const dias = intereses.length > 0 ? intereses[0].dias : {};

const reporteDetalleCuota = data.map((el) => {
  const diferenciaDias = calcularDiasAtrasos(el.fechaVencimiento);

  let estado = "";
  let recargoCalculado = 0;
  let cuotasConRecargo = 0;
  const defDias = Math.abs(diferenciaDias);

  if (defDias > dias || defDias > 15) {
    estado = defDias;
    recargoCalculado = (parseFloat(el.montoUnitario) * porcentaje) / 100;
    cuotasConRecargo = parseFloat(el.montoUnitario) + recargoCalculado;

    const data = {
      estado,
      recargoCalculado,
      cuotasConRecargo,
    };
    console.log(data);
  } else if (defDias > dias && defDias < 15) {
    estado = defDias;
    recargoCalculado = (parseFloat(el.montoUnitario) * porcentaje) / 100;
    cuotasConRecargo = parseFloat(el.montoUnitario) + recargoCalculado;
    const data = {
      estado,
      recargoCalculado,
      cuotasConRecargo,
    };
    console.log(data);
  } else if (diferenciaDias > 0) {
    estado = 0;
  }

  return {
    idDetalleCuota: el.idDetalleCuota,
    numCuota: el.numCuota,
    montoUnitario: el.montoUnitario,
    recargo: recargoCalculado,
    valorFinalCuota: cuotasConRecargo,
    fechaInicio: el.fechaInicio,
    fechaVencimiento: el.fechaVencimiento,
    fechaDelPago: el.fechaDelPago,
    montoPag: el.montoPag,
    estado: el.estado,
    NOperacion: el.NOperacion,
    idCuotas: el.idCuotas,
    idMedioDePago: el.idMedioDePago,
    idIntereses: el.idIntereses,
  };
});

// console.log(reporteDetalleCuota);


const anio = "2024";

console.log(anio)