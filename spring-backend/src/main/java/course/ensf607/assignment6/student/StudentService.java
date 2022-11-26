package course.ensf607.assignment6.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            throw new IllegalStateException("student does'nt exist!");
        }
        return studentById.get();
    }
    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)){
            throw new IllegalStateException(
                    "student with id" + studentId + "does not exist"
            );
        }
        studentRepository.deleteById(studentId);
    }

    public Optional<Student> searchStudentByUcid(String ucid) {
        Optional<Student> studentByUcid = studentRepository.findStudentByUcid(ucid);
        return studentByUcid;
    }
    @Transactional
    public void updateStudentPassword(Long studentId, String oldPassword, String newPassword) {
        Student studentById = studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        if (oldPassword.length() > 0 && !oldPassword.equals(studentById.getPassword())){
            throw new IllegalArgumentException("Wrong password");
        }
        studentById.setPassword(newPassword);
    }
}
