export const generarNumeroDeOperacion = () => {
  return `${Date.now()}${Math.floor(Math.random() * 1000)}`;
};
