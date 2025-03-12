const request = require('supertest');
const { app, db } = require('../index');

describe('GET /material_availability/:material_id/:colony_id', () => {
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

    it('should return code 200 and a valid material_id and colony_id', async () => {
        const materialId = 1; 
        const colonyId = 13; 

        const res = await request(server).get(`/material_availability/${materialId}/${colonyId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            material_id: materialId,
            colony_id: colonyId,
            
        });
    });

    it('should return code 404 and Material availability record not found', async () => {
      const materialId = 1; 
      const colonyId = 1; 

      const res = await request(server).get(`/material_availability/${materialId}/${colonyId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({message: 'Material availability record not found'});
        
      });

    it('should return code 404 and Material availability record not found', async () => {
      const materialId = 'a'; 
      const colonyId = 'b'; 
  
      const res = await request(server).get(`/material_availability/${materialId}/${colonyId}`);
  
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({message: 'Material availability record not found'});
          
      });
  });
