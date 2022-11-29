package course.ensf607.assignment6.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }


    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addNewStudent(Student student) {
        Optional<Student> studentByUcid = studentRepository.findStudentByUcid(student.getUcid());
        if (studentByUcid.isPresent()) {
            throw new IllegalStateException("Student already exist!");
        }
        studentRepository.save(student);
    }

    public Student getStudentById(Long studentId) {
        Optional<Student> studentById = studentRepository.findById(studentId);
        if (!studentById.isPresent()) {
            throw new IllegalStateException("student doesn't exist!");
        }
        return studentById.get();
    }
    public Student getStudentByUcid(String ucid) {
        Optional<Student>studentByUcid = studentRepository.findStudentByUcid(ucid);
        if (!studentByUcid.isPresent()){
            throw new IllegalStateException("student doesn't exist!");
        }
        return studentByUcid.get();
    }
    public void deleteStudent(String ucid) {
        Optional<Student>studentByUcid = studentRepository.findStudentByUcid(ucid);
        if (!studentByUcid.isPresent()){
            throw new IllegalStateException(
                    "student with id" + ucid + "does not exist"
            );
        }
        studentRepository.deleteById(studentByUcid.get().getStudentId());
    }

    public Optional<Student> searchStudentByUcid(String ucid) {
        Optional<Student> studentByUcid = studentRepository.findStudentByUcid(ucid);
        return studentByUcid;
    }
    @Transactional
    public void updateStudentPassword(String ucid, String oldPassword, String newPassword) {
        Student studentByUcid = studentRepository.findStudentByUcid(ucid)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        if (oldPassword.length() > 0 && !oldPassword.equals(studentByUcid.getPassword())){
            throw new IllegalArgumentException("Wrong password");
        }
        studentByUcid.setPassword(newPassword);
    }


    public void updateStudent(Student student) {
        studentRepository.save(student);
    }
}
