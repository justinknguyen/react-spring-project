package course.ensf607.assignment6.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/student")
@CrossOrigin
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping
    public void registerNewStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path = "{studentId}")
    public void updateStudentPassword(@PathVariable("studentId") Long studentId,
                              @RequestParam String oldPassword,
                              @RequestParam String newPassword) {
        studentService.updateStudentPassword(studentId, oldPassword, newPassword);
    }

    @GetMapping(path = "{studentId}")
    public Optional<Student> searchStudentByUcid(String ucid){
        return studentService.searchStudentByUcid(ucid);
    }
}
