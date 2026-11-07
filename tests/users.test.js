const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

const validUser = { name: 'Ana', email: 'ana@example.com' };

test('GET /health responde ok', async () => {
  const res = await request(app).get('/health');

  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { status: 'ok' });
});

test('POST /users crea un usuario', async () => {
  const res = await request(app).post('/users').send(validUser);

  assert.equal(res.status, 201);
  assert.equal(res.body.name, validUser.name);
  assert.equal(res.body.email, validUser.email);
  assert.equal(typeof res.body.id, 'number');
});

test('GET /users lista los usuarios', async () => {
  const { body: created } = await request(app).post('/users').send(validUser);

  const res = await request(app).get('/users');

  assert.equal(res.status, 200);
  assert.ok(res.body.some((user) => user.id === created.id));
});

test('GET /users/:id devuelve el usuario', async () => {
  const { body: created } = await request(app).post('/users').send(validUser);

  const res = await request(app).get(`/users/${created.id}`);

  assert.equal(res.status, 200);
  assert.deepEqual(res.body, created);
});

test('PUT /users/:id actualiza el usuario', async () => {
  const { body: created } = await request(app).post('/users').send(validUser);

  const res = await request(app)
    .put(`/users/${created.id}`)
    .send({ name: 'Ana Maria', email: 'ana.maria@example.com' });

  assert.equal(res.status, 200);
  assert.equal(res.body.name, 'Ana Maria');
  assert.equal(res.body.email, 'ana.maria@example.com');
});

test('DELETE /users/:id elimina el usuario', async () => {
  const { body: created } = await request(app).post('/users').send(validUser);

  const res = await request(app).delete(`/users/${created.id}`);
  const lookup = await request(app).get(`/users/${created.id}`);

  assert.equal(res.status, 204);
  assert.equal(lookup.status, 404);
});
