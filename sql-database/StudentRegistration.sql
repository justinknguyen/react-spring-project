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
INSERT INTO DEPARTMENT (DepartmentID, DeptName)
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
('Mark', 'Rober', 'NasaMan', 'SquirrelsAreCool1', 82227355),
('Anna', 'Yortrick', 'beforesunset', 'autoCon3xt', 87415286);

CREATE VIEW STUDENT_NAMES
AS SELECT LName, FName
FROM STUDENT;

#Create ADMINISTRATION Table
DROP TABLE IF EXISTS ADMINISTRATION;
CREATE TABLE ADMINISTRATION(
FName     	varchar(25) not null,
LName     	varchar(25) not null,
UserName  	varchar(20) not null,
Pwrd  		varchar(25) not null,
AdminID 	int(8) not null,
primary key (AdminID, UserName, Pwrd)
);

#Populate ADMINISTRATION Table
INSERT INTO ADMINISTRATION (FName, LName, UserName, Pwrd, AdminID)
VALUES
('Mohammad', 'Moshirpour', 'mmoship', 'MEngRocks', 42013541),
('Mahmood', 'Moussavi', 'moussam', 'ImOutOfPasswordIdeas', 80192646),
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
INSERT INTO COURSE(CourseID, CourseName, DepartmentID, PreReq_CourseID_1, PreReq_CourseID_2, PreReq_CourseID_3)
VALUES
('ENGG225','Circuit Fundamentals','ENGG', null, null, null),
('ENDG233','Programming Fundamentals','ENGG', null, null, null),
('FNCE211','Introduction to Business Management','CASH', null, null, null),
('EDUC215','Teaching Teachers 101','EDUC', null, null, null),
('CPSC319','Data and Algorithms','CPSC', 'ENDG233', null, null),
('ENEL419','Probability and Random Variables','ENGG', 'ENGG225', null, null),
('ENCM511','Embedded Systems','ENGG', 'ENDG233', 'ENGG225', 'ENEL419'),
('MEDS201','Intro to Medicine','MEDS', null, null, null),
('NURS420','Advanced Application of Herbal Medication','MEDS', 'MEDS201', null, null),
('PHYS302','Physical Properties and Interaction in Space Time','DANG', null, null, null),
('ESAY238','Intro to Essay Writing','ENGL', null, null, null);

#Set Foreign Keys for PreReqs
ALTER TABLE COURSE
ADD foreign key (PreReq_CourseID_1) references COURSE(CourseID),
ADD	foreign key (PreReq_CourseID_2) references COURSE(CourseID),
ADD	foreign key (PreReq_CourseID_3) references COURSE(CourseID);

# Transfering ownership of course from one DeptID to another
#updates it in course_offering too
DELIMITER $$
CREATE TRIGGER COURSE_TRANSFERS_DEPT
BEFORE UPDATE
ON COURSE FOR EACH ROW
BEGIN
    #Make sure we're not changing the CourseID
    IF(new.CourseID = old.CourseID) THEN
    
		IF EXISTS(SELECT * FROM DEPARTMENT AS d WHERE d.DepartmentID = new.DepartmentID) THEN
    
			SET FOREIGN_KEY_CHECKS=0; #disable foreign key checks
			#Updating the DepartmentID
			UPDATE COURSE_OFFERING AS co
			SET co.DeptID = new.DepartmentID
			WHERE co.DeptID = old.DepartmentID;
			SET FOREIGN_KEY_CHECKS=1; #re-enable foreign key checks
            
		END IF;
    END IF;
END$$
DELIMITER ;

#Create trigger to delete any course_offerings when deleting a course
#We intentionally will not (and cannot) delete a course that is a pre-req of another course
DELIMITER $$
CREATE TRIGGER COURSE_DISCONTINUED
BEFORE DELETE
ON COURSE FOR EACH ROW
BEGIN

	#Delete any course offering we delete from the course list
	DELETE FROM COURSE_OFFERING AS co
	WHERE co.CourseID = old.CourseID;

END$$
DELIMITER ;

#Create COURSE_OFFERING Table
DROP TABLE IF EXISTS COURSE_OFFERING;
CREATE TABLE COURSE_OFFERING(
DeptID		varchar(4) not null,
CourseID	varchar(7) not null,
SectionID	varchar(3) not null,
Seats		int(3) not null,
primary key(DeptID, CourseID, SectionID),
foreign key (CourseID) references COURSE(CourseID),
foreign key (DeptID) references DEPARTMENT(DepartmentID)
);

#Populate COURSE_OFFERING Table
INSERT INTO COURSE_OFFERING(DeptID, CourseID, SectionID, Seats)
VALUES
('ENGG', 'ENGG225', 'L01', 100),
('ENGG', 'ENGG225', 'L02', 100),
('ENGG', 'ENDG233', 'L01', 200),
('CASH', 'FNCE211', 'L01', 500),
('EDUC', 'EDUC215', 'L01', 25),
('EDUC', 'EDUC215', 'L02', 25),
('CPSC', 'CPSC319', 'L01', 300),
('ENGG', 'ENEL419', 'L01', 80),
('ENGG', 'ENEL419', 'L02', 80),
('ENGG', 'ENEL419', 'L03', 80),
('MEDS', 'MEDS201', 'L01', 150),
('MEDS', 'NURS420', 'L01', 100),
('DANG', 'PHYS302', 'L01', 42),
('ENGL', 'ESAY238', 'L01', 200),
('ENGL', 'ESAY238', 'L02', 200),
('ENGG', 'ENCM511', 'L01', 30),
('ENGG', 'ENCM511', 'L02', 30);

#Updating DeptID here updates it in registration too
DELIMITER $$
CREATE TRIGGER OFFERED_BY_ANOTHER_DEPT
BEFORE UPDATE
ON COURSE_OFFERING FOR EACH ROW
BEGIN

	#Updating the DeptID
	UPDATE REGISTRATION AS r
    SET r.DeptID = new.DeptID
    WHERE r.DeptID = old.DeptID;

END$$
DELIMITER ;


# Create trigger to delete any registration when deleting an offering
DELIMITER $$
CREATE TRIGGER NO_LONGER_OFFERED
BEFORE DELETE
ON COURSE_OFFERING FOR EACH ROW
BEGIN

	DELETE FROM REGISTRATION AS r
	WHERE r.CourseID = old.CourseID and r.SectionID = old.SectionID;

END$$
DELIMITER ;


#Create REGISTRATION Table
DROP TABLE IF EXISTS REGISTRATION;
CREATE TABLE REGISTRATION(
DeptID		varchar(4) not null,
CourseID 	varchar(7) not null,
SectionID	varchar(3) not null,
StudentID	int(8) not null,
theGrade	varchar(1),
primary key (DeptID, CourseID, SectionID, StudentID),
foreign key (DeptID, CourseID, SectionID) references COURSE_OFFERING(DeptID, CourseID, SectionID),
foreign key (StudentID) references STUDENT(StudentID)
);

#Populate REGISTRATION Table
INSERT INTO REGISTRATION(DeptID, CourseID, SectionID, StudentID, theGrade)
VALUES
('ENGG', 'ENGG225', 'L01', 30038090, null),
('ENGG', 'ENGG225', 'L01', 30042258, null),
('ENGG', 'ENGG225', 'L01', 30030377, null),
('ENGG', 'ENGG225', 'L01', 81394338, null),
('ENGG', 'ENGG225', 'L01', 97662159, null),
('ENGG', 'ENGG225', 'L01', 32934372, null),
('ENGG', 'ENGG225', 'L01', 12345678, null),
('ENGG', 'ENGG225', 'L01', 82227355, null),
('DANG', 'PHYS302', 'L01', 97662159, null),
('DANG', 'PHYS302', 'L01', 12345678, null),
('DANG', 'PHYS302', 'L01', 30030377, null),
('EDUC', 'EDUC215', 'L02', 32934372, null),
('CASH', 'FNCE211', 'L01', 32934372, null),
('CASH', 'FNCE211', 'L01', 30038090, null),
('CASH', 'FNCE211', 'L01', 30042258, null);