CREATE DATABASE HospitalManagementSystem;

\u HospitalManagementSystem

CREATE TABLE MedicalHistory (
uid int PRIMARY KEY, 
allergies varchar(50) NOT NULL, 
gender varchar(20) NOT NULL, 
conditions varchar(100) NOT NULL, 
surgeries varchar(100) NOT NULL, 
symptoms varchar(100) NOT NULL, 
familyhistory varchar(100) NOT NULL, 
medications varchar(100) NOT NULL, 
habits varchar(100) NOT NULL 
);

CREATE TABLE User(
email varchar(50) PRIMARY KEY,
 DOB varchar(30) NOT NULL,
 password varchar(30) NOT NULL
);

CREATE TABLE Patient(
email varchar(50) PRIMARY KEY REFERENCES User (email),
DOB varchar(30) REFERENCES User (DOB),
password varchar(30) REFERENCES User (password),
uid int UNIQUE NOT NULL,
firstName varchar(25) NOT NULL,
lastName varchar(25) NOT NULL,
address varchar(60) NOT NULL
);

CREATE TABLE DoctorNurse(
email varchar(50) PRIMARY KEY REFERENCES User (email),
DOB varchar(30) REFERENCES User (DOB),
password varchar(30) REFERENCES User (password),
uid int UNIQUE NOT NULL,
firstName varchar(25) NOT NULL,
lastName varchar(25) NOT NULL
);

CREATE TABLE Room(
room_id int PRIMARY KEY,
floor int NOT NULL,
bld_no int NOT NULL
);


CREATE TABLE DoctorsSeePatients(
patient int NOT NULL,
doctor int NOT NULL,
concerns varchar(40) NOT NULL,
symptoms varchar(40) NOT NULL,
PRIMARY KEY (patient, doctor),
FOREIGN KEY (patient) REFERENCES Patient (uid),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (uid)
);

CREATE TABLE Appointment(
appt_id int PRIMARY KEY,
date varchar(10) NOT NULL,
time int NOT NULL,
status varchar(15) NOT NULL
);

CREATE TABLE PatientsMakeHistory(
patient int NOT NULL,
medhistory int NOT NULL,
PRIMARY KEY (patient,medhistory),
UNIQUE (patient),
UNIQUE (medhistory),
FOREIGN KEY (patient) REFERENCES Patient (uid),
FOREIGN KEY (medhistory) REFERENCES MedicalHistory (uid)
);

CREATE TABLE ApptInRoom(
room int NOT NULL,
appt int NOT NULL,
FOREIGN KEY (room) REFERENCES Room (room_id),
FOREIGN KEY (appt) REFERENCES Appointment (appt_id)
);

CREATE TABLE Diagnose(
appt int NOT NULL,
i int NOT NULL,
PRIMARY KEY (appt,i),
patient int NOT NULL,
doctor int NOT NULL,
FOREIGN KEY (appt) REFERENCES Appointment (appt_id),
FOREIGN KEY (patient) REFERENCES Patient (uid),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (uid)
);

CREATE TABLE Scheduled(
appt int NOT NULL,
patient int NOT NULL,
PRIMARY KEY (appt,patient),
doctor int NOT NULL,
FOREIGN KEY (appt) REFERENCES Appointment (appt_id),
FOREIGN KEY (patient) REFERENCES Patient (uid),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (uid)
);

CREATE TABLE ScheduledFor(
appt int NOT NULL,
doctor int NOT NULL,
PRIMARY KEY (appt,doctor),
patient int NOT NULL,
FOREIGN KEY (appt) REFERENCES Appointment (appt_id),
FOREIGN KEY (patient) REFERENCES Patient (uid),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (uid)
);

CREATE TABLE DoctorsAccess(
medhistory int NOT NULL,
doctor int NOT NULL,
PRIMARY KEY (medhistory,doctor),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (uid),
FOREIGN KEY (medhistory) REFERENCES MedicalHistory (uid)
);