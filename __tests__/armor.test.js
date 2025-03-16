const request = require('supertest');
const { app, db } = require('../index');

describe('GET /armor', () => {
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

    // Armor Tests
  it('should return a 200 status code and an array of armor pieces', async () => {
        const res = await request(server).get('/armor');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a 200 status code the correct data for a specific armor piece', async () => {
      const res = await request(server).get('/armor/1');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1); 
      expect(res.body[0].armor_name).toBe('Firstborn Powered Helmet'); 
  });

  it('should return 200 & the correct data for a specific armor piece', async () => {
    const res = await request(server).get('/armor/10');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1); 
    expect(res.body[0].armor_name).toBe('MT-27'); 
  });

  it('should return a 404 error with: armor piece not found', async () => {
  const res = await request(server).get('/armor/500');
  expect(res.statusCode).toBe(404);
  expect(res.body).toEqual({message: 'Armor piece not found'}); 
  });

  it('should return a 404 error with: armor piece not found', async () => {
    const res = await request(server).get('/armor/a');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({message: 'Armor piece not found'}); 
  });

});