# Show all tables and explain how they are related to one another (keys, triggers, etc.)
# Talk about in Video Demo, show StudentRegistration.sql and explain design choices regarding keys, triggers, etc.

# A basic retrieval query
# Retrieve registration
select * 
from registration;

#Retrieve all student names from view STUDENT_NAMES
select * 
from STUDENT_NAMES;

# A retrieval query with ordered results
# Retrieve Student's last name, first name, and studentID, and sort by last name
select LName, FName, AdminID 
from ADMINISTRATION
order by LName;

# A nested retrieval query
# List the department names of the departments that offer courses with at most 50 seats
select d.DeptName 
from department as d
where d.DepartmentID in (select DeptID
						 from course_offering as co
                         where co.Seats <= 50);

# A retrieval query using joined tables
# Retrieve all the students first and last name, as well as the CourseID and SectionID
# of students registered to the FNCE211 course
select LName, FName, CourseID, SectionID
from (student join registration on student.StudentID=registration.StudentID)
where CourseID = 'FNCE211';

# An update operation with any necessary triggers
# Change Department of PHYS302 from DANG to WOAH is NOT allowed (is not an existing department in DEPARTMENT)
# (Should give error)
update course
set DepartmentID = 'WOAH'
where CourseID = 'PHYS302';

# Changing CourseID IS NOT ALLOWED (Should give an error)
update course
set CourseID = 'PHYS202'
where CourseID = 'PHYS302';

# Changing Department in COURSE_OFFERING is not allowed (should give error)
update course_offering
set DeptID = 'LMAO'
where DeptID = 'CASH';

# Changing Department in REGISTRATION is not allowed (should give error)
update REGISTRATION
set DeptID = 'LMAO'
where DeptID = 'CASH';

# Change Department of PHYS302 from DANG to ENGG is allowed (No error)
update course
set DepartmentID = 'ENGG'
where CourseID = 'PHYS302';

# A deletion operation with any necessary triggers
#Deleting a course which is a pre-requisite IS NOT ALLOWED (Should give error)
delete from course
where CourseID = 'ENGG225';

#Deleting PHYS302 (not a pre-req) from the course list removes it from COURSE_OFFERING (and also in REGISTRATION)
#Scenario: Course is no longer offered by the school
delete from course
where CourseID = 'PHYS302';

# Deleting a FNCE211 offering, which will also remove it from REGISTRATION (i.e. students are unregistered from the course now)
# Scenario: course is not offered for this semester, but may still be offered in another term (and so will be kept in the DB)
# Alternative scenario: 2 Sections of the course exists, but one will be removed due to lack of students
delete from course_offering
where DeptID = 'CASH' and CourseID = 'FNCE211' and SectionID = 'L01';
