#Create Database
DROP DATABASE IF EXISTS STUDENTREGISTRATION;
CREATE DATABASE STUDENTREGISTRATION; 
USE STUDENTREGISTRATION;

#Create DEPARTMENT Table
DROP TABLE IF EXISTS DEPARTMENT;
CREATE TABLE DEPARTMENT(
DepartmentID    	varchar(4) not null,
DeptName	     	varchar(50) not null,
primary key (DepartmentID)
);

#Populate DEPARTMENT Table
INSERT INTO DEPARTMENT (DepartmentID, No_Of_Courses)
VALUES
('MATH', 'Math Department'),
('ENGG', 'Schulich School of Engineering'),
('CASH', 'Haskayne School of Business'),
('CPSC', 'Computer Science'),
('EDUC', 'Werklund School of Education'),
('MEDS', 'Cummings School of Medicine'),
('ENGL', 'Department of English Literature and Arts'),
('DANG', 'Department of Astrology, Nebulas, and Galaxies');


#Create STUDENT Table
DROP TABLE IF EXISTS STUDENT;
CREATE TABLE STUDENT(
FName     	varchar(25) not null,
LName     	varchar(25) not null,
UserName  	varchar(20) not null,
Pwrd  		varchar(25) not null,
StudentID 	int(8) not null,
primary key (StudentID, UserName, Pwrd)
);

#Populate STUDENT Table
INSERT INTO STUDENT (FName, LName, UserName, Pwrd, StudentID)
VALUES
('Clark', 'Dy', 'clark0523', 'password123', 30038090),
('Justin', 'Nguyen', 'orbit', 'qwertyPass', 30042258),
('Douglas', 'Yau', 'digug', 'compMaster420', 30030377),
('Denzel', 'Crocker', 'fairiesRreal', 'fairieZ', 81394338),
('Spongebob', 'Squarepants', 'MrReady', 'ImR34dy', 97662159),
('Tom', 'Nook', 'townPresident', 'bells4lyfe', 32934372),
('Joe', 'Smith', 'user', 'pass', 12345678),
('Mark', 'Rober', 'NasaMan', 'SquirrelsAreCool1', 82227355);

#Create ADMINISTRATION Table
DROP TABLE IF EXISTS ADMINISTRATION;
CREATE TABLE ADMINISTRATION(
FName     	varchar(25) not null,
LName     	varchar(25) not null,
UserName  	varchar(20) not null,
Pwrd  		varchar(25) not null,
AdminID 	int(8) not null,
CourseID	varchar(7) not null,
primary key (AdminID, UserName, Pwrd),
foreign key (CourseID) references COURSE(CourseID)
);

#Populate ADMINISTRATION Table
INSERT INTO ADMINISTRATION (FName, LName, UserName, Pwrd, AdminID)
VALUES
('Mohammad', 'Moshirpour', 'mmoship', 'MEngRocks', 42013541),
('Mahmood', 'Moussavi', 'moussam', 'ImRunningOutOfPasswordIdeas', 80192646),
('Master', 'Shifu', 'shifushifu', 'mastermaster', 53587461),
('Lee', 'Tul Caesar', 'pizzaPizza', 'deliveryDelivery', 32594563),
('Harland', 'Sanders', 'PFKing', 'fingerLickingG00d', 81201447);

#Create COURSE Table
DROP TABLE IF EXISTS COURSE;
CREATE TABLE COURSE(
CourseID		varchar(7) not null,
CourseName		varchar(50) not null,
DepartmentID	varchar(4) not null,
PreReq_CourseID_1 varchar(7),
PreReq_CourseID_2 varchar(7),
PreReq_CourseID_3 varchar(7),
primary key (CourseID, DepartmentID),
foreign key (DepartmentID) references DEPARTMENT(DepartmentID)
);

#Populate COURSE Table



#Create COURSE_OFFERING Table
DROP TABLE IF EXISTS COURSE_OFFERING;
CREATE TABLE COURSE_OFFERING(
SectionID	varchar(3) not null,
CourseID	varchar(7) not null,
DeptID		varchar(4) not null,
Seats		int(3) not null,
primary key(SectionID, CourseID, DeptID),
foreign key (CourseID) references COURSE(CourseID),
foreign key (DeptID) references DEPARTMENT(DepartmentID)
);

#Populate COURSE_OFFERING Table


#Create REGISTRATION Table
DROP TABLE IF EXISTS REGISTRATION;
CREATE TABLE REGISTRATION(
DeptID		varchar(4) not null,
CourseID 	varchar(7) not null,
SectionID	varchar(3) not null,
StudentID	int(8) not null,
theGrade	varchar(1),
primary key (DeptID, CourseID, SectionID, StudentID),
foreign key (DeptID) references DEPARTMENT(DepartmentID),
foreign key (CourseID) references COURSE_OFFERING(CourseID),
foreign key (SectionID) references COURSE_OFFERING(SectionID),
foreign key (StudentID) references STUDENT(StudentID)
);

#Populate REGISTRATION Table



