CREATE DATABASE HospitalManagementSystem;

\u HospitalManagementSystem

CREATE TABLE Patient(
email varchar(50) PRIMARY KEY,
password varchar(30) NOT NULL,
name varchar(50) NOT NULL,
address varchar(60) NOT NULL
);

CREATE TABLE MedicalHistory (
uid int NOT NULL,
email varchar(50) NOT NULL,
PRIMARY KEY (uid, email),
UNIQUE (uid, email),
allergies varchar(50) NOT NULL, 
gender varchar(20) NOT NULL, 
conditions varchar(100) NOT NULL, 
surgeries varchar(100) NOT NULL, 
medications varchar(100) NOT NULL,
FOREIGN KEY (email) REFERENCES Patient (email)
);

CREATE TABLE DoctorNurse(
email varchar(50) PRIMARY KEY,
gender varchar(20),
password varchar(30),
uid int UNIQUE NOT NULL,
name varchar(50) NOT NULL
);

CREATE TABLE Building(
name varchar(20) PRIMARY KEY,
address varchar(30) NOT NULL
);

CREATE TABLE Room(
id int AUTO_INCREMENT PRIMARY KEY,
room_num int NOT NULL,
floor int NOT NULL,
bldg varchar(20),
UNIQUE (room_num, floor, bldg),
status varchar(20),
FOREIGN KEY (bldg) REFERENCES Building (name)
);

CREATE TABLE Appointment(
uid int PRIMARY KEY,
date varchar(10) NOT NULL,
starttime int NOT NULL,
endtime int NOT NULL,
status varchar(15) NOT NULL
);

CREATE TABLE PatientsViewAppointments(
patient varchar(50) NOT NULL,
appt int NOT NULL,
concerns varchar(40) NOT NULL,
symptoms varchar(40) NOT NULL,
FOREIGN KEY (patient) REFERENCES Patient (email),
FOREIGN KEY (appt) REFERENCES Appointment (uid)
);


CREATE TABLE Schedule(
uid int PRIMARY KEY,
starttime int NOT NULL,
endtime int NOT NULL,
breaktime int NOT NULL,
daysOff varchar(20)
);

CREATE TABLE PatientsfillHistory(
patient varchar(50) NOT NULL,
medhistory int NOT NULL,
UNIQUE (patient),
UNIQUE (medhistory),
FOREIGN KEY (patient) REFERENCES Patient (email),
FOREIGN KEY (medhistory) REFERENCES MedicalHistory (uid)
);

CREATE TABLE Diagnose(
appt int NOT NULL,
patient varchar(50) NOT NULL,
doctor varchar(50) NOT NULL,
diagnosis varchar(40) NOT NULL,
prescription varchar(20) NOT NULL,
FOREIGN KEY (appt) REFERENCES Appointment (uid),
FOREIGN KEY (patient) REFERENCES Patient (email),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (email)
);

CREATE TABLE ApptsToSchedules(
appt int NOT NULL,
sched int NOT NULL,
FOREIGN KEY (appt) REFERENCES Appointment (uid),
FOREIGN KEY (sched) REFERENCES Schedule (uid)
);

CREATE TABLE DocsHaveSchedules(
sched int NOT NULL,
doctor varchar(20) NOT NULL,
FOREIGN KEY (sched) REFERENCES Schedule (uid),
FOREIGN KEY (doctor) REFERENCES DoctorNurse (email)
);

CREATE TABLE DoctorViewsMed(
medhistory int NOT NULL,
doctor varchar(50) NOT NULL,
FOREIGN KEY (doctor) REFERENCES DoctorNurse (email),
FOREIGN KEY (medhistory) REFERENCES MedicalHistory (uid)
);

CREATE TABLE ApptInRoom(
room int NOT NULL,
appt int NOT NULL,
FOREIGN KEY (room) REFERENCES Room (id),
FOREIGN KEY (appt) REFERENCES Appointment (uid)
);