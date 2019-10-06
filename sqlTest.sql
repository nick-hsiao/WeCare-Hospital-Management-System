CREATE DATABASE HospitalManagementSystem;

\u HospitalManagementSystem

CREATE TABLE MedicalHistory (
uid serial PRIMARY KEY, 
allergies varchar(50) NOT NULL, 
gender varchar(20) NOT NULL, 
conditions varchar(100) NOT NULL, 
surgeries varchar(100) NOT NULL, 
symptoms varchar(100) NOT NULL, 
familyhistory varchar(100) NOT NULL, 
medications varchar(100) NOT NULL, 
habits varchar(100) NOT NULL 
);

CREATE TABLE Patient( 
uid serial PRIMARY KEY, 
name varchar(50) NOT NULL, 
address varchar(50) NOT NULL, 
password varchar(50) NOT NULL, 
email varchar(20) NOT NULL
);

# haven't gotten this to work yet but left here to continue
#CREATE TABLE PatientHasHistory (
#patient serial REFERENCES Patient (uid),
#history serial REFERENCES MedicalHistory (uid)
#);