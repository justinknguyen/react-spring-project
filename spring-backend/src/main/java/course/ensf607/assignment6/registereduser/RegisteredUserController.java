package course.ensf607.assignment6.registereduser;

// import course.ensf607.assignment6.student.Student;
// import course.ensf607.assignment6.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/registereduser/")
public class RegisteredUserController {

    private final RegisteredUserService registeredUserService;

    // private final StudentService studentService;

    @Autowired
    public RegisteredUserController(RegisteredUserService registeredUserService) {
        this.registeredUserService = registeredUserService;
    }

    @GetMapping("all")
    public List<RegisteredUser> getAllUsers() {
        return registeredUserService.getAllRegisteredUsers();
    }

    @PostMapping("add")
    public void addNewUser(@RequestBody RegisteredUser registeredUser) {
        registeredUserService.addNewUser(registeredUser);
    }

    // @GetMapping("{email}")
    // public RegisteredUser getByEmail(@PathVariable String email) {
    // return registeredUserService.findByEmail(email);
    // }

    // @PutMapping("{courseId}/students/{studentId}")
    // public Course enrollStudentToCourse(@PathVariable Long courseId,
    // @PathVariable Long studentId) {
    // Course course = courseService.getCourseById(courseId);
    // Student student = studentService.getStudentById(studentId);
    // course.enrolledStudents(student);
    // courseService.updateCourse(course);
    // return course;
    // }
}
