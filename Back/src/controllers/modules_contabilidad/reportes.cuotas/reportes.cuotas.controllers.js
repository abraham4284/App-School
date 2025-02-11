import { pool } from "../../../db.js";
import { calcularDiasAtrasos } from "../../../helpers/module_contabilidad/detalle_cuota/calcularDiasAtrasoCuotas.js";

export const getReporteDetalleCuotasByIdCuotas = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === (null || undefined)) {
      return res
        .status(404)
        .json({ message: "El id no puede ser nulo o indefinido" });
    }

    const queryDetalleCuotas = "SELECT * FROM detallecuota WHERE idCuotas = ?";
    const queryIntereses = "SELECT * FROM intereses ";
    const [detalleCuotas] = await pool.query(queryDetalleCuotas, [id]);
    const [intereses] = await pool.query(queryIntereses);

    const { fechaVto, montoUnitario } =
      detalleCuotas.length > 0 ? detalleCuotas[0] : {};
    // const { porcentaje, dias } = intereses.length > 0 ? intereses[0] : {};

    const reporteDetalleCuota = detalleCuotas.map((el) => {
      const { diferenciaDias } = calcularDiasAtrasos(el.fechaVto);

      let estado = "";
      let recargoCalculado = 0;
      let cuotasConRecargo = 0;

      intereses.map((data) => {
        if (diferenciaDias < 0) {
          const defDias = Math.abs(diferenciaDias);
          if (defDias > el.dias || defDias > 15) {
            estado = diferenciaDias;
            recargoCalculado =
              (parseFloat(el.montoUnitario) * data.porcentaje) / 100;
            cuotasConRecargo = parseFloat(el.montoUnitario) + recargoCalculado;
          } else if (defDias > el.dias && defDias < 15) {
            estado = diferenciaDias;
            recargoCalculado =
              (parseFloat(el.montoUnitario) * data.porcentaje) / 100;
            cuotasConRecargo = parseFloat(el.montoUnitario) + recargoCalculado;
          }
        } else if (diferenciaDias > 0) {
          estado = "Cuota vigente";
        }
      });

      return {
        idDetalleCuota: el.idDetalleCuota,
        numCuota: el.numCuota,
        montoUnitario: el.montoUnitario,
        recargo: recargoCalculado,
        valorFinalCuota: cuotasConRecargo,
        fechaInicio: el.fechaInicio,
        fechaVencimiento: el.fechaVto,
        fechaDelPago: el.fechaDelPago,
        montoPag: el.montoPag,
        estadoPago: el.estado,
        NOperacion: el.NOperacion,
        idCuotas: el.idCuotas,
        idMedioDePago: el.idMedioDePago,
        idIntereses: el.idIntereses,
        estadoAtraso: estado,
      };
    });

    console.log(reporteDetalleCuota);
    res.json(reporteDetalleCuota);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en getReporteDetalleCuotasByIdCuotas",
    });
  }
};
