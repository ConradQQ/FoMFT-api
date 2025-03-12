// rawMaterials.test.js
const request = require('supertest');
const { app, db } = require('../index');

describe('GET /colonies', () => {
    let server;

    beforeAll(() => {
        server = app.listen(3001, () => {
            console.log('Test server listening on port 3001');
        });
    });

    afterAll((done) => {
        server.close(() => {
            db.end(() => {
                done();
            });
        });
    });

    // Colonies Tests
  it('should return a 200 status code and an array of colonies', async () => {
        const res = await request(server).get('/colonies');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 200 status code the correct data for a specific colony', async () => {
      const res = await request(server).get('/colonies/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1); 
      expect(res.body[0].colony_name).toBe('NYC Manhattan'); 
  });

  it('should return 202 & the correct data for a specific colony', async () => {
    const res = await request(server).get('/colonies/18');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1); 
    expect(res.body[0].colony_name).toBe('DSS Yukon'); 
  });

  it('should return a 404 error with: colony not found', async () => {
  const res = await request(server).get('/colonies/99');
  expect(res.statusCode).toBe(404);
  expect(res.body).toEqual({message: 'Colony not found'}); 
  });

  it('should return a 404 error with: colony not found', async () => {
    const res = await request(server).get('/colonies/a');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({message: 'Colony not found'}); 
  });

});