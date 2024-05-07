import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; //server is initialization

describe('Patient Controller', () => {
  // JWT token for authentication
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzdXl1a3RpQGdtYWlsLmNvbSIsIlVzZXJSb2xlIjoiRG9jdG9yIiwiaWF0IjoxNzE1MDQ5NTI3LCJleHAiOjE3MTU2NTQzMjd9.9AskEqOseKG3jUs02reOyIJaKKzGFUfsQEJmpMGt-fc';

  // Test for getting all patients
  describe('GET /api/v1/patients/getallpatients', () => {
    it('should get all patients', async () => {
      const response = await request(app)
        .get('/api/v1/patient/getallpatients')
        .set('Cookie', [`token=${authToken}`]); // Set the JWT token as a cookie

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('Patients');
    });
  });

  // Test for getting a patient by ID
  describe('GET /api/v1/patient/getpatientbyid/:id', () => {
    it('should get a patient by ID', async () => {
      
      const patientId = 1;

      const response = await request(app)
        .get(`/api/v1/patient/getpatientbyid/${patientId}`)
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.patient).to.exist;
    });
  });

  // Test for updating patient details
//   describe('PUT /api/v1/patient/updatepatient/:id', () => {
//     it('should update a patient', async () => {
//       const patientId = 7;
//       const updatedDetails = {
//         Age: 30,
//         ContactNumber: '1235467890'
//       };

//       const response = await request(app)
//         .put(`/api/v1/patient/updatepatient/${patientId}`)
//         .set('Cookie', [`token=${authToken}`]) 
//         .send(updatedDetails);

//       expect(response.status).to.equal(200);
//       expect(response.body).to.be.an('object');
//       expect(response.body.success).to.equal(true);
//       expect(response.body.patient).to.exist;
//       
//     });
//   });
});
