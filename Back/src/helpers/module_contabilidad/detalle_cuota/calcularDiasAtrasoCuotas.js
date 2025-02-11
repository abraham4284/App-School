export const calcularDiasAtrasos = (fecha) => {
  if (!fecha) return;
  const fechaVencimiento = new Date(fecha);
  const fechaActual = new Date();
  const diferenciaMilisegundos = fechaVencimiento - fechaActual;
  const diferenciaDias = Math.ceil(
    diferenciaMilisegundos / (1000 * 60 * 60 * 24) + 1
  );

  return {
    diferenciaDias,
  };
};
