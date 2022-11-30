package course.ensf607.assignment6.student;

import course.ensf607.assignment6.course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        Optional<Student> student = studentService.searchStudentByUcid(ucid);
        Student stu = student.get();
        System.out.println(stu.getSubjects());
        return studentService.searchStudentByUcid(ucid);
    }
    @GetMapping(path = "courses/{ucid}")
    public Set<Course> getStudentCourses(@PathVariable("ucid") String ucid){
        Student student = studentService.getStudentByUcid(ucid);
        return student.getSubjects();
    }


}
