import { expect } from "chai";
import request from "supertest";
import app from "../index.js"; 

describe('User Controller', () => {
    const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJzdXl1a3RpQGdtYWlsLmNvbSIsIlVzZXJSb2xlIjoiRG9jdG9yIiwiaWF0IjoxNzE1MDUxMzA1LCJleHAiOjE3MTU2NTYxMDV9.eiUJW66ihpinPEvHfn9wgDbCINskCPZVjnwSfMPFoGQ';

  describe('POST /api/v1/user/patientregister', () => {
    it('should register a new patient', async () => {
      const response = await request(app)
        .post('/api/v1/user/patientregister')
        .set('Cookie', [`token=${authToken}`])
        .send({
          PatientName: 'Test Test',
          Age: 30,
          Gender: 'Male',
          ContactNumber: '1234567890',
          Email: 'test@gmail.com',
          Passwordd: 'Test@123',
          UserRole: 'Patient',
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success').to.equal(true);
      expect(response.body).to.have.property('message').to.equal('Patient Registered Successfully');
    });
  });

 // Test for registering a new doctor
//  describe('POST /api/v1/user/doctorregister', () => {
//     it('should register a new doctor', async () => {
//       const doctorData = {
//         DoctorName: 'Dr. Test',
//         Speciality: 'Cardiology',
//         Experience: 10,
//         Qualification: 'MBBS, MD',
//         Designation: 'Senior Consultant',
//         Email: 'drtest@gmail.com',
//         UserRole: 'Doctor',
//         Passwordd: 'Test@123',
//       };

//       const response = await request(app)
//         .post('/api/v1/user/doctorregister')
//         .set('Cookie', [`token=${authToken}`])
//         .send(doctorData);

//       expect(response.status).to.equal(200);
//       expect(response.body).to.have.property('success').to.equal(true);
//       expect(response.body).to.have.property('message').to.equal('Doctor Registered Successfully');
//     });
//   });

  // Test for logging in as a doctor
  describe('POST /api/v1/user/login', () => {
    it('should login as a doctor', async () => {
      const loginData = {
        UserRole: 'Doctor    ',
        Email: 'suyukti@gmail.com',
        Passwordd: 'Suyukti@123',
      };

      const response = await request(app)
        .post('/api/v1/user/login')
        .send(loginData);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('success').to.equal(true);
      expect(response.body).to.have.property('message').to.equal('Doctor Login Successfully');
      expect(response.body).to.have.property('token');
    });
  });

  // Test for logging out
//   describe('POST /api/v1/user/logout', () => {
//     it('should logout', async () => {
//       const response = await request(app)
//         .post('/api/v1/user/logout')
//         .set('Cookie', [`token=${authToken}`]);

//       expect(response.status).to.equal(201);
//       expect(response.body).to.have.property('success').to.equal(true);
//       expect(response.body).to.have.property('message').to.equal('User Logged Out Successfully');
//     });
//   });

  
});
