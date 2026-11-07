const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'El id debe ser un entero positivo' });
  }

  next();
}

function validateUser(req, res, next) {
  const { name, email } = req.body ?? {};
  const details = [];

  if (typeof name !== 'string' || name.trim() === '') {
    details.push('name es obligatorio');
  }

  if (typeof email !== 'string' || !EMAIL_PATTERN.test(email.trim())) {
    details.push('email debe ser un correo válido');
  }

  if (details.length > 0) {
    return res.status(400).json({ error: 'Datos inválidos', details });
  }

  req.body = { name: name.trim(), email: email.trim() };
  next();
}

module.exports = { validateId, validateUser };
