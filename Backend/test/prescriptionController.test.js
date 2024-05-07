import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; //server initialization

describe('Prescription Controller', () => {

  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzdXl1a3RpQGdtYWlsLmNvbSIsIlVzZXJSb2xlIjoiRG9jdG9yIiwiaWF0IjoxNzE1MDUxMzA1LCJleHAiOjE3MTU2NTYxMDV9.eiUJW66ihpinPEvHfn9wgDbCINskCPZVjnwSfMPFoGQ';

  // Test for creating a new prescription
  describe('POST /api/v1/prescription/createprescription', () => {
    const prescriptionData = {
      RecordID: '1', 
      Medicine: 'Test Medicine',
      Instructions: 'Test Instructions',
      Dosage: 'Test Dosage'
    };

    it('should create a new prescription', async () => {
      const response = await request(app)
        .post('/api/v1/prescription/createprescription')
        .set('Cookie', [`token=${authToken}`]) // Set the authorization token in cookies
        .send(prescriptionData);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      
    });
  });

  // Test for getting all prescriptions
  describe('GET /api/v1/prescription/getallprescription', () => {
    it('should get all prescriptions', async () => {
      const response = await request(app)
        .get('/api/v1/prescription/getallprescription')
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('Prescriptions');
    });
  });

  // Test for getting a prescription by ID
  describe('GET /api/v1/prescription/getprescription/:id', () => {
    it('should get a prescription by ID', async () => {
      const prescriptionId = 11;

      const response = await request(app)
        .get(`/api/v1/prescription/getprescription/${prescriptionId}`)
        .set('Cookie', [`token=${authToken}`]); // Set the authorization token in cookies

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.Prescriptions).to.exist;
    });
  });

  // Test for getting all prescriptions by RecordID
  describe('GET /api/v1/prescription/getallprescriptionbyrecord/:id', () => {
    it('should get all prescriptions by RecordID', async () => {
      const recordId = 1;

      const response = await request(app)
        .get(`/api/v1/prescription/getallprescriptionbyrecord/${recordId}`)
        .set('Cookie', [`token=${authToken}`]); 

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.prescription).to.exist;
    });
  });

  // Test for updating a prescription
  describe('PUT /api/v1/prescription//updateprescription/:id', () => {
    it('should update a prescription', async () => {
      
      const prescriptionId = 11;
      const updatedDetails = {
        Medicine: 'Updated Medicine',
        Instructions: 'Updated Instructions',
        Dosage: 'Updated Dosage',
      };

      const response = await request(app)
        .put(`/api/v1/prescription/updateprescription/${prescriptionId}`)
        .set('Cookie', [`token=${authToken}`])
        .send(updatedDetails);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.prescription).to.exist;
    });
  });

  // Test for deleting a prescription
  describe('DELETE /api/v1/prescription/deleteprescription/:id', () => {
    it('should delete a prescription by ID', async () => {
      const prescriptionId = 111;

      const response = await request(app)
        .delete(`/api/v1/prescription/deleteprescription/${prescriptionId}`)
        .set('Cookie', [`token=${authToken}`]); // Set the authorization token in cookies

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal("Prescription deleted succesfully");
    });
  });

});
