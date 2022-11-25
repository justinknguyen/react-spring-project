package com.dougy.StudentRegistration.Student;

import com.dougy.StudentRegistration.Student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository <Student, Integer> {
    Optional<Student> findStudentByUserName(String userName);
    Optional<Student> findStudentByStudentId(Integer studentId);
}
