function notFound(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada' });
}

// Express reconoce este middleware de errores por sus cuatro parámetros.
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo no es un JSON válido' });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = { notFound, errorHandler };
