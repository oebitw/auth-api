'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { server } = require('../../src/server.js');
const request = supergoose(server);

let id;

describe('Test Clothes', () => {


  it('Test getting empty clothes data using GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  
  
  it('Test Creating new clothes using POST /clothes', async () => {
    const response = await request.post('/api/v1/clothes').send({
      name: 'suit',
      color: 'navy blue',
      size: '48',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('suit');
    id = response.body._id;
  });
  
  it('Test getting all clothes data using GET /clothes', async () => {
    const response = await request.get('/api/v1/clothes');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('Test getting specific clothes data using GET /clothes/id', async () => {
    const response = await request.get(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('suit');
  });

  it('Test updating data using PUT /clothes/id', async () => {
    const response = await request.put(`/api/v1/clothes/${id}`).send({
      name: 'shorts',
      color: 'red',
      size: '48',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('shorts');
    expect(response.body.color).toEqual('red');
  });

  it('Test deleting clothes using delete /clothes/id', async () => {
    const response = await request.delete(`/api/v1/clothes/${id}`);
    expect(response.status).toEqual(200);
  });

});
  
  
  
describe('Test Food', () => {
  
  
  it('Test getting empty food data using GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  
  
  it('Test Creating new food using POST /food', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'orange',
      calories: 25,
      type: 'FRUIT',

    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('orange');
    id = response.body._id;
  });
  
  it('Test getting all food data using GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('Test getting specific food data using GET /food/id', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('orange');
  });

  it('Test updating data using PUT /food/id', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      name: 'pizza',
      calories: 250,
      type: 'ITALIAN',
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('pizza');
    expect(response.body.type).toEqual('ITALIAN');
  });
  it('Test deleting food using delete /food/id', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
});