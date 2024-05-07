import { expect } from "chai";
import request from "supertest";
import app from "../index.js";

describe('Doctor Controller', () => {

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm1vbEBnbWFpbC5jb20iLCJVc2VyUm9sZSI6IlBhdGllbnQiLCJpYXQiOjE3MTQ5ODU5NzMsImV4cCI6MTcxNTU5MDc3M30.KZg7nZbxfabp18oTFWGQB5mGFzXxNrm62IogJv2lOFY';

  // Test for getting all doctors
  describe('GET /api/v1/doctor/getalldoctors', () => {
    it('should get all doctors', async () => {
      const response = await request(app)
        .get('/api/v1/doctor/getalldoctors')
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('Doctors');
    });
  });

  // Test for getting a doctor by ID
  describe('GET /api/v1/doctor/getdoctorbyid/:id', () => {
    it('should get a doctor by ID', async () => {
      const doctorId = 13;

      const response = await request(app)
        .get(`/api/v1/doctor/getdoctorbyid/${doctorId}`)
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.doctor).to.exist;
    });
  });

  // Test for updating doctor details
//   describe('PUT /api/v1/doctor/updatedoctor/:id', () => {
//     it('should update a doctor', async () => {
//       const doctorId = 22;
//       const updatedDetails = {
//         Experience: 'Updated experience',
//         Designation: 'Updated designation'
//       };

//       const response = await request(app)
//         .put(`/api/v1/doctor/updatedoctor/${doctorId}`)
//         .set('Cookie', [`token=${authToken}`])
//         .send(updatedDetails);

//       expect(response.status).to.equal(200);
//       expect(response.body).to.be.an('object');
//       expect(response.body.success).to.equal(true);
//       expect(response.body.doctor).to.exist;
//     });
//   });
});
