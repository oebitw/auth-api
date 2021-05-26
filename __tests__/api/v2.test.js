'use strict';

process.env.SECRET = 'test';

const supergoose = require('@code-fellows/supergoose');
const jwt = require('jsonwebtoken');

const Users = require('../../src/auth/models/users.js');
const { server } = require('../../src/server.js');
const request = supergoose(server);

let id;
let users = {
  user: { username: 'user', password: 'password', role: 'user' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  admin: { username: 'admin', password: 'password', role: 'admin' },
};

beforeAll(async () => {
  await new Users(users.admin).save();
  await new Users(users.user).save();
});

const user = { username: 'admin' };
const token = jwt.sign(user, process.env.SECRET);

const basic = { username: 'basic' };
const basicToken = jwt.sign(basic, process.env.SECRET);



describe('Testing V2 routes ', () => {




  it('Test getting data from /clothes route when there is no data', async () => {
    const response = await request
      .get('/api/v2/clothes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('Test POST new clothes using /clothes', async () => {
    const response = await request
      .post('/api/v2/clothes')
      .send({
        name: 'hat',
        color: 'black',
        size: 'free size',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('hat');
    id = response.body._id;
  });


  it('Test Getting specific data on GET /clothes/id', async () => {
    const response = await request
      .get(`/api/v2/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('hat');
  });

  it('Test throwing an error if the ID does not exist on GET /clothes', async () => {
    const response = await request
      .get(`/api/v2/clothes/1`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });

  it('Test getting all data from DataBase using GET /clothes', async () => {
    const response = await request
      .get('/api/v2/clothes')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('Test updating data on PUT /clothes', async () => {
    const response = await request
      .put(`/api/v2/clothes/${id}`)
      .send({
        name: 'dress',
        color: 'pink',
        size: 'L',
      })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('dress');
  });

  it('Test throwing an error if the ID does not exist on PUT /clothes', async () => {
    const response = await request
      .put(`/api/v2/clothes/1`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });
  it('Test deleting data using DELETE /clothes', async () => {
    const response = await request
      .delete(`/api/v2/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('Test throwing an error if the ID does not exist on DELETE /clothes', async () => {
    const response = await request
      .delete(`/api/v2/clothes/1`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });
  it('Test throwing an error when adding invalid model', async () => {
    const response = await request
      .get('/api/v2/omar')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });
  it('Test denying access for the user with the wrong token', async () => {
    const response = await request
      .post(`/api/v2/clothes`)
      .send({
        name: 'suit',
        color: 'navy blue',
        size: '46',
      })
      .set('Authorization', `Bearer ${basicToken}`);
    expect(response.status).toEqual(403);
  });
  it('Test denying access for the user without a token', async () => {
    const response = await request
      .post(`/api/v2/clothes`)
      .send({
        name: 'shorts',
        color: 'red',
        size: 'XL',
      })
      .set('Authorization', `Bearer xxxxxxx`);
    expect(response.status).toEqual(403);
  });
});



describe('Testing /users and /secret routes', () => {


  it('should not allow non users to access /secret route', async () => {
    const response = await request.get('/api/v2/secret');
    expect(response.status).toEqual(500);
  });
  it('Deny users with invalid token to access /secret route', async () => {
    const response = await request
      .get('/api/v2/secret')
      .set('Authorization', `Bearer xxxxxxx`);
    expect(response.status).toEqual(500);
  });

  it('should not allow all users to access /users route', async () => {
    const response = await request
      .get('/api/v2/users')
      .set('Authorization', `Bearer ${basicToken}`);
    expect(response.status).toEqual(500);
  });

  it('Test Denying unautharized users from access  /secret route', async () => {
    const response = await request
      .get('/api/v2/secret')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(500);
  });
});