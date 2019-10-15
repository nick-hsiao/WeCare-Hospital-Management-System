############ Database and Schema Creation ###################

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
prescription varchar(50) NOT NULL,
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



######### Table Fill ###########

INSERT INTO Patient(email,password,name,address)
VALUES
('imsosick@gmail.com','wowzers','Ai Minh Payne','1212 Twelve Rd, San Jose, CA'),
('pikachugrrl83@gmail.com','kentucky','King Kong','3151 Spam, Milpitas, CA'),
('Spam&Rice@hotmail.com','nashville','Bert Ernie', '1000 Sesame Street'),
('jonisthebest@yahoo.com','ilovejon','Jon Jon', '2400 Jon Ct, Reno, CA'),
('lightning2456@gmail.com','kachow', 'Mcqueen', '1111 Washington, Forks, WA'),
('honeybunches@gmail.com','OFOATS','Post Nihon', '949 Wild Ave, San Francisco, CA'),
('thecia@us.gov', 'pass123', 'John Doe', '1234 Big Rd, Washington DC'),
('orangesherbert13@gmail.com', 'nodairy', 'Owen G. Herbert', '31313 Tigr, Krakow, Russia'),
('Wunderbar24@gmail.com','kalel','Hans Landa','5666 Hemmel, Berlin, Germany'),
('its2am@sjsu.edu','helpme','Kevin McCallister','1344 Yonkers, NYC, NY'),
('timeconsuming@sjsu.edu','dataentry','Andy M. Dunn','1441 Pringles, NY'),
('boris.dyokovic@ibm.com','bears4lyfe','Boris Dyokovic','555 Bailey Ave, San Jose, CA'),
('thewindu@sbcglobal.net','purpleflurp','Samuel Jackson','4554 Sandy Str, Milpitas, CA'),
('honkytonk66@gmail.com','CountryBoy','Monty Houston','4444 Sprout Ave, Nashville, NJ'),
('muyrapido55@gmail.com','notActually','Matthew Murdock','9987 Trimball, Fremont, CA');

INSERT INTO MedicalHistory(uid,email,allergies,gender,conditions,surgeries,medications)
VALUES
(1,'imsosick@gmail.com','sand,fish','male','Pain in abdomen,Asthma','Appendectomy','Albuterol'),
(2,'pikachugrrl83@gmail.com','none','female','Frequent Indigestion','none','none'),
(3,'Spam&Rice@hotmail.com','rice','male','Inflamed throat','Wisdom teeth removal','none'),
(4,'jonisthebest@yahoo.com', 'none' ,'male','Parkinsons','none','none'),
(5, 'lightning2456@gmail.com', 'none', 'female', 'Pre-hypertension', 'none', 'none'),
(6, 'honeybunches@gmail.com','nut/nut oils', 'female', 'Fatigue', 'none', 'none'),
(7, 'thecia@us.gov', 'none', 'male', 'Paranoia/Anxiety','none','none'),
(8, 'orangesherbert13@gmail.com','dairy', 'male', 'Food poisoning/indigestion','none','none'),
(9, 'Wunderbar24@gmail.com', 'none', 'male', 'Overweight','none','none'),
(10, 'its2am@sjsu.edu', 'none', 'male', 'Caffeine Withdrawal', 'Growth removal', 'none'),
(11, 'timeconsuming@sjsu.edu', 'alcohol','male','Insomnia','none','none'),
(12, 'boris.dyokovic@ibm.com', 'none', 'male', 'Back pain', 'none', 'none'),
(13, 'thewindu@sbcglobal.net', 'none', 'male', 'Eye pain', 'none', 'none'),
(14, 'honkytonk66@gmail.com', 'none', 'female', 'Splinters in right arm', 'none', 'none'),
(15, 'muyrapido55@gmail.com', 'red meat', 'male', 'Swollen face', 'none','none');

INSERT INTO Appointment(uid,date,starttime,endtime,status)
VALUES
(1, '01/14/2019', 0730, 0900, 'Done'),
(2, '05/30/2019', 0900, 1200, 'Done'),
(3, '04/10/2019', 0900, 1200, 'Done'),
(4, '10/31/2019', 0700, 1200, 'NotDone'),
(5, '11/11/2019', 0900, 1200, 'NotDone'),
(6, '01/11/2020', 0830, 1100, 'NotDone'),
(7, '03/26/2020', 1400, 1700, 'NotDone'),
(8, '11/23/2019', 0900, 1200, 'NotDone'),
(9, '08/10/2019', 1000, 1100, 'Done'),
(10, '09/09/2019', 1200, 1300, 'Done'),
(11, '02/04/2020', 1400, 1600, 'NotDone'),
(12, '08/24/2018', 0900, 1200, 'Done'),
(13, '04/14/2019', 0900, 1200, 'Done'),
(14, '10/14/2016', 1800, 1900, 'Done'),
(15, '03/19/2019', 0900, 1200, 'Done')
;

INSERT INTO Building(name,address)
VALUES
('MG Surgery', '1100 Main Street, San Jose, CA'),
('MG Clinic 1', '1101 Main Street, San Jose, CA'),
('MG Clinic 2', '1102 Main Street, San Jose, CA'),
('MG Clinic 3', '1103 Main Street, San Jose, CA'),
('MG Clinic 4', '1104 Main Street, San Jose, CA'),
('MG ER', '1105 Main Street, San Jose, CA'),
('MG PT Clinic', '1106 Main Street, San Jose, CA'),
('MG Pediatrics', '1107 Main Street, San Jose, CA'),
('MG Surgery 2', '1108 Main Street, San Jose, CA'),
('MG ER 2', '1109 Main Street, San Jose, CA'),
('MG Academy', '1110 Main Street, San Jose, CA'),
('MG Drug Rehab', '1100 Main Street, San Jose, CA'),
('MG Clinic 5', '1111 Main Street, San Jose, CA'),
('MG Psychiatry', '1112 Main Street, San Jose, CA'),
('MG Oncology', '1113 Main Street, San Jose, CA')
;

INSERT INTO Room(room_num,floor,bldg,status)
VALUES
('04','2', 'MG ER 2', 'AVAILABLE'),
('01','1', 'MG Academy', 'AVAILABLE'),
('06','2', 'MG Surgery', 'AVAILABLE'),
('05','2', 'MG Psychiatry', 'AVAILABLE'),
('01','3', 'MG Oncology', 'AVAILABLE'),
('04','2', 'MG Pediatrics', 'AVAILABLE'),
('04','1', 'MG Drug Rehab', 'AVAILABLE'),
('09','2', 'MG Clinic 2', 'AVAILABLE'),
('12','1', 'MG Clinic 1', 'AVAILABLE'),
('06','3', 'MG Clinic 3', 'AVAILABLE'),
('05','2', 'MG Clinic 2', 'AVAILABLE'),
('02','1', 'MG Clinic 1', 'AVAILABLE'),
('04','1', 'MG Pediatrics', 'AVAILABLE'),
('08','1', 'MG Oncology', 'AVAILABLE'),
('09','1', 'MG ER 2', 'AVAILABLE')
;

INSERT INTO DoctorNurse(email, gender, password, uid, name)
VALUES
('Nick.Nolte@MetroGrand.gov', 'male', '123teehee', 99001, 'Nick Nolte'),
('SandyRaimi@MetroGrand.gov', 'female', 'yeehaw', 99002, 'Sandy Raimi'),
('Bob.Grundy@MetroGrand.gov', 'male', '123tee4', 99003, 'Bob Grundy'),
('Tanya.Hilton@MetroGrand.gov', 'female', '122hee', 99004, 'Tanya Hilton'),
('Sam.Worthington@MetroGrand.gov', 'male', 'avatar2021', 99005, 'Sam Worthington'),
('Winston.Johnson@MetroGrand.gov', 'male', 'banana', 99006, 'Winston Johnson'),
('Priya.Rajanpal@MetroGrand.gov', 'female', 'goodeats', 99007, 'Priya Rajanpal'),
('Lichiang.Yi@MetroGrand.gov', 'male', 'hk4vr', 99008, 'Li-Chiang Yi'),
('Weston.Thurston@MetroGrand.gov', 'male', 'easton', 99009, 'Weston Thurston'),
('Ignacio.Mundo@MetroGrand.gov', 'male', 'NACHO24', 99010, 'Ignacio del Mundo'),
('Padma.Patil@MetroGrand.gov', 'female', 'harry', 99011, 'Padma Patil'),
('Remus.Lupin@MetroGrand.gov', 'male', 'lycanthrope', 99012, 'Remus Lupin'),
('Harry.Housen@MetroGrand.gov', 'male', 'googlybear', 99013, 'Harry Housen'),
('Tuco.Salamanca@MetroGrand.gov', 'male', 'tight', 99014, 'Tuco Salamanca'),
('Tommy.Gunn@MetroGrand.gov', 'male', 'thebest124134', 99015, 'Tommy Gunn')
;

INSERT INTO Schedule(uid,starttime,endtime,breaktime,daysOff)
VALUES
(001,0900,1700,'1200','MWTh'),
(002,0900,1700,'1200','WF'),
(003,0900,1700,'1200','SaSu'),
(004,0900,1700,'1200','MW'),
(005,0900,1700,'1200','Th'),
(006,0900,1700,'1200','WTh'),
(007,0900,1700,'1200','TTh'),
(008,0900,1700,'1200','MTTh'),
(009,0900,1700,'1200','MF'),
(010,0900,1700,'1200','FSa'),
(011,0900,1700,'1200','TTh'),
(012,0900,1700,'1200','TThF'),
(013,0900,1700,'1200','MW'),
(014,0900,1700,'1200','Sa'),
(015,0900,1700,'1200','Su')
;

INSERT INTO PatientsFillHistory(patient,medhistory)
VALUES
('imsosick@gmail.com',1),
('pikachugrrl83@gmail.com',2),
('Spam&Rice@hotmail.com',3),
('jonisthebest@yahoo.com',4),
('lightning2456@gmail.com',5),
('honeybunches@gmail.com',6),
('thecia@us.gov',7),
('orangesherbert13@gmail.com',8),
('Wunderbar24@gmail.com',9),
('its2am@sjsu.edu',10),
('timeconsuming@sjsu.edu',11),
('boris.dyokovic@ibm.com',12),
('thewindu@sbcglobal.net',13),
('honkytonk66@gmail.com',14),
('muyrapido55@gmail.com',15)
;

#These values need to be changed, because I had a failed creation set, so it started at 16 for the auto increment. Basically, this is only for my screenshot, do 1-15
INSERT INTO ApptInRoom(room,appt)
VALUES
(1, 1),
(16, 2),
(17, 3),
(18, 4),
(19, 5),
(20, 6),
(21, 7),
(22, 8),
(23, 9),
(24, 10),
(25, 11),
(26, 12),
(27, 13),
(28, 14),
(29, 15)
;

INSERT INTO diagnose(appt,patient,doctor,diagnosis,prescription)
VALUES
(1,'imsosick@gmail.com','Nick.Nolte@MetroGrand.gov', 'Major bloating due to allergy', 'Ibuprofen as needed'),
(2,'pikachugrrl83@gmail.com', 'SandyRaimi@MetroGrand.gov', 'Muscle tightness/soreness', 'Stretch morning/night and before workouts'),
(3,'Spam&Rice@hotmail.com', 'Bob.Grundy@MetroGrand.gov', 'Prehypertension', 'Heart Medication'),
(4,'jonisthebest@yahoo.com','Tanya.Hilton@MetroGrand.gov','Osteoarthritis', 'none'),
(5,'lightning2456@gmail.com','Sam.Worthington@MetroGrand.gov', 'Heartburn', 'Heartburn medication'),
(6,'honeybunches@gmail.com','Winston.Johnson@MetroGrand.gov', 'Obesity', 'none'),
(7,'thecia@us.gov', 'Priya.Rajanpal@MetroGrand.gov', 'Atherosclerosis', 'See nutritionist'),
(8,'orangesherbert13@gmail.com','Lichiang.Yi@MetroGrand.gov', 'Allergic Reaction to Dairy', 'none'),
(9,'Wunderbar24@gmail.com', 'Weston.Thurston@MetroGrand.gov', 'Shin Splints', 'See: PT'),
(10,'its2am@sjsu.edu', 'Ignacio.Mundo@MetroGrand.gov', 'Caffeine Withdrawal', 'Caffeine pills, wean off'),
(11,'timeconsuming@sjsu.edu', 'Padma.Patil@MetroGrand.gov', 'Insomnia', 'Melatonin'),
(12,'boris.dyokovic@ibm.com', 'Remus.Lupin@MetroGrand.gov', 'Anxiety', 'See Psych'),
(13,'thewindu@sbcglobal.net', 'Harry.Housen@MetroGrand.gov', 'Cancer', 'See Oncologist'),
(14,'honkytonk66@gmail.com', 'Tuco.Salamanca@MetroGrand.gov', 'Whooping cough', 'none'),
(15,'muyrapido55@gmail.com', 'Tommy.Gunn@MetroGrand.gov', 'Shoulder Impingement', 'See PT')
;

INSERT 