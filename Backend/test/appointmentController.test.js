import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; 
import { cookie } from "express-validator";

describe('Appointment Controller', () => {
  // JWT token for authorization
  const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbm1vbEBnbWFpbC5jb20iLCJVc2VyUm9sZSI6IlBhdGllbnQiLCJpYXQiOjE3MTQ5ODU5NzMsImV4cCI6MTcxNTU5MDc3M30.KZg7nZbxfabp18oTFWGQB5mGFzXxNrm62IogJv2lOFY';

  // Test for creating a new appointment
  describe('POST /api/v1/appointment/createappointment', () => {
    const appointmentData = {
      DoctorID: '3',
      PatientID: '1',
      AppointmentDate: '2024-05-06 00:00:00',
      Symptoms: 'Test symptoms',
      AppointmentStatus: 'Completed'
    };

    it('should create a new appointment', async () => {
      const response = await request(app)
        .post('/api/v1/appointment/createappointment')
        .set('Cookie', [`token=${authToken}`]) // Set the authorization token in cookies
        .send(appointmentData);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
    });
  });

  // Test for getting all appointments
  describe('GET /api/v1/appointment/getallappointment', () => {
    it('should get all appointments', async () => {
      const response = await request(app)
        .get('/api/v1/appointment/getallappointment')
        .set('Cookie', [`token=${authToken}`]); 

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('Appointments');
    });
  });
  // Test fot get an appoitnment by ID
  describe('GET /api/v1/appointment/getappointmentbyid/:id', () => {
    it('should get an appointment by ID', async () => {
      const appointmentId = 1;
  
      const response = await request(app)
        .get(`/api/v1/appointment/getappointmentbyid/${appointmentId}`)
        .set('Cookie', [`token=${authToken}`]); 
  
      // Assert that the response status is 200 OK
      expect(response.status).to.equal(200);
      
      // Assert that the response body contains the appointment data
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.Appointments).to.exist;
      expect(response.body.Appointments).to.be.an('object');
      expect(response.body.Appointments).to.have.property('AppointmentID');
    });
  });
  // Test for getting all appointments by doctor ID
  describe('GET /api/v1/appointment/getappointmentbydoctorid/:id', () => {
    it('should get all appointments by doctor ID', async () => {
      const doctorId = 3;

      const response = await request(app)
        .get(`/api/v1/appointment/getappointmentbydoctorid/${doctorId}`)
        .set('Cookie', [`token=${authToken}`]); 

     
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.appointment).to.exist;
    });
  });

  // Test for getting all appointments by patient ID
  describe('GET /api/v1/appointment/getappointmentbypatientid/:id', () => {
    it('should get all appointments by patient ID', async () => {
      // Assuming you have a patient with ID 1 in your database
      const patientId = 1;

      const response = await request(app)
        .get(`/api/v1/appointment/getappointmentbypatientid/${patientId}`)
        .set('Cookie', [`token=${authToken}`]);
      
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.appointment).to.exist;
    });
  });
  //Delete an appointment
  describe('DELETE /api/v1/appointment/cancelappointment/:id', () => {
    it('should cancel an appointment', async () => {
      const appointmentId = 10;//database value

      const response = await request(app)
        .delete(`/api/v1/appointment/cancelappointment/${appointmentId}`)
        .set('Cookie', [`token=${authToken}`]);

      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.success).to.equal(true);
      expect(response.body.message).to.equal("Appointment canceled successfully");
    });
  });


});