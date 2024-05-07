import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; // Assuming this is where your server is initialized

describe('Medical Record Controller', () => {

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzdXl1a3RpQGdtYWlsLmNvbSIsIlVzZXJSb2xlIjoiRG9jdG9yIiwiaWF0IjoxNzE1MDE3Nzc0LCJleHAiOjE3MTU2MjI1NzR9.jIfakSbLJdnkjhwIf5HfctAfTd6sjY-ycGfelmrXG5s';

  // Test for creating a new medical record
  describe('POST /api/v1/medical/createrecord', () => {
    const medicalRecordData = {
      CurrentSymptoms: 'Test symptoms',
      PhysicalExamination: 'Test examination',
      TreatmentPlan: 'Test treatment',
      RecommendedTests: 'Test tests',
      AppointmentID: '1' 
    };

    it('should create a new medical record', async () => {
      const response = await request(app)
        .post('/api/v1/medical/createrecord')
        .set('Cookie', [`token=${authToken}`]) // Set the authorization token in cookies
        .send(medicalRecordData);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
    });
  });

  // Test for getting all medical records
  describe('GET /api/v1/medical/getallrecord', () => {
    it('should get all medical records', async () => {
      const response = await request(app)
        .get('/api/v1/medical/getallrecord')
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200, 'Expected status code to be 200');
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('MedicalRecords');
    });
  });

  // Test for getting a medical record by ID
  describe('GET /api/v1/medical/getrecordbyid/:id', () => {
    it('should get a medical record by ID', async () => {
      const recordId = 1;//db value

      const response = await request(app)
        .get(`/api/v1/medical/getrecordbyid/${recordId}`)
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200, 'Expected status code to be 200');
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.record).to.exist;
    });
  });

  // Test for updating a medical record
  describe('PUT /api/v1/medical/updaterecord/:id', () => {
    it('should update a medical record', async () => {
      const recordId = 12;
      const updatedDetails = {
        CurrentSymptoms: 'Updated symptoms',
        PhysicalExamination: 'Updated examination',
        TreatmentPlan: 'Updated treatment',
        RecommendedTests: 'Updated tests',
      };

      const response = await request(app)
        .put(`/api/v1/medical/updaterecord/${recordId}`)
        .set('Cookie', [`token=${authToken}`])
        .send(updatedDetails);

      expect(response.status).to.equal(200, 'Expected status code to be 200');
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.record).to.exist;
    });
  });

  // Test for deleting a medical record by ID
  describe('DELETE /api/v1/medical/deleterecord/:id', () => {
    it('should delete a medical record by ID', async () => {
      const recordId = 111;

      const response = await request(app)
        .delete(`/api/v1/medical/deleterecord/111`)
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200, 'Expected status code to be 200');
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal("Medical Record deleted succesfully");
    });
  });

});
