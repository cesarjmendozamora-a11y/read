const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('POST /users rechaza un cuerpo vacío', async () => {
  const res = await request(app).post('/users');

  assert.equal(res.status, 400);
  assert.equal(res.body.details.length, 2);
});

test('POST /users rechaza un email inválido', async () => {
  const res = await request(app)
    .post('/users')
    .send({ name: 'Ana', email: 'correo-malo' });

  assert.equal(res.status, 400);
  assert.deepEqual(res.body.details, ['email debe ser un correo válido']);
});

test('POST /users rechaza un JSON mal formado', async () => {
  const res = await request(app)
    .post('/users')
    .set('Content-Type', 'application/json')
    .send('{malo');

  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'El cuerpo no es un JSON válido');
});

test('PUT /users/:id rechaza datos incompletos', async () => {
  const { body: created } = await request(app)
    .post('/users')
    .send({ name: 'Ana', email: 'ana@example.com' });

  const res = await request(app)
    .put(`/users/${created.id}`)
    .send({ name: 'Solo nombre' });

  assert.equal(res.status, 400);
});

test('un id no válido devuelve 400', async () => {
  const res = await request(app).get('/users/abc');

  assert.equal(res.status, 400);
});

test('un usuario inexistente devuelve 404', async () => {
  const res = await request(app).get('/users/999999');

  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'Usuario no encontrado');
});

test('una ruta inexistente devuelve 404', async () => {
  const res = await request(app).get('/no-existe');

  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'Ruta no encontrada');
});
