// rawMaterials.test.js
const request = require('supertest');
const { app, db } = require('../index');

describe('GET /raw_materials', () => {
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

    // Raw Materials Tests
    it('should return a 200 status code and an array of raw materials', async () => {
        const res = await request(server).get('/raw_materials');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return the correct data for a specific raw material', async () => {
      const res = await request(server).get('/raw_materials/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1); 
      expect(res.body[0].material_name).toBe('Platinum'); 
  });

  it('should return the correct data for a specific raw material', async () => {
    const res = await request(server).get('/raw_materials/40');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1); 
    expect(res.body[0].material_name).toBe('Diamonds'); 
});

it('should return a 404 error with: Raw material not found', async () => {
  const res = await request(server).get('/raw_materials/99');
  expect(res.statusCode).toBe(404);
  expect(res.body).toEqual({message: 'Raw Material not found'}); 
});

// Colonies Tests


});