package course.ensf607.assignment6.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping(path = "{ucid}")
    public void deleteStudent(@PathVariable("ucid") String ucid){
        studentService.deleteStudent(ucid);
    }

    @PutMapping(path = "{ucid}/{oldPassword}/{newPassword}")
    public void updateStudentPassword(@PathVariable("ucid") String ucid,
                                      @PathVariable("oldPassword") String oldPassword,
                                      @PathVariable("newPassword") String newPassword) {
        studentService.updateStudentPassword(ucid, oldPassword, newPassword);
    }

    @GetMapping(path = "{ucid}")
    public Optional<Student> searchStudentByUcid(@PathVariable("ucid") String ucid){
        return studentService.searchStudentByUcid(ucid);
    }


}
