const request = require('supertest');
const { app, db } = require('../index');

describe('GET /production_components', () => {
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

    // Production Components Tests

  it('should return a 200 status code and an array of production components', async () => {
        const res = await request(server).get('/production_components');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return the correct data for a specific production component of id 1', async () => {
    const res = await request(server).get('/production_components/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1); 
    expect(res.body[0].component_name).toBe('Aluminium'); 
});

it('should return the correct data for a specific production component of id 23', async () => {
  const res = await request(server).get('/production_components/23');
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveLength(1); 
  expect(res.body[0].component_name).toBe('Deuterium Water'); 
});

it('should return production component not found', async () => {
    const res = await request(server).get('/production_components/99');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({message: 'Production component not found'}); 
    
  });


});