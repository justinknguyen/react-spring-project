package com.dougy.StudentRegistration.Student;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }
    public List<Student> getStudents(){
        return studentRepository.findAll();
    }

    public Long getNumOfStudents(){
        return studentRepository.count();
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentOptional = studentRepository.findStudentByUserName(student.getUserName());
        if (studentOptional.isPresent()){
            throw new IllegalStateException("username exists in db");
        }
        studentRepository.save(student);
//        System.out.println(student);
    }

    public void deleteStudent(Integer studentId) {
        Optional<Student> studentOptional = studentRepository.findStudentByStudentId(studentId);

        if (studentOptional.isEmpty()){
            throw new IllegalStateException("studentID not found");
        }
        studentRepository.delete(studentOptional.get());
    }
}
