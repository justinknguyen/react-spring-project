package com.dougy.StudentRegistration.Student;

import com.dougy.StudentRegistration.User.User;
import jdk.swing.interop.SwingInterOpUtils;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

@Entity(name = "student")
public class Student extends User {
    @Column(
            name = "student_id"
    )
    private Integer studentId;

    public Student() {
    }

    public Student(String userName,
                   String password,
                   String firstName,
                   String lastName,
                   Integer studentId) {
        super(userName, password, firstName, lastName);
        this.studentId = studentId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "Student{" +
                "studentId=" + studentId +
                "} " + super.toString();
    }
}
