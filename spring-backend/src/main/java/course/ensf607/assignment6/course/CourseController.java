package course.ensf607.assignment6.course;

import course.ensf607.assignment6.student.Student;
import course.ensf607.assignment6.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path = "api/v1/course")
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    private final StudentService studentService;

    @Autowired
    public CourseController(CourseService courseService, StudentService studentService) {
        this.courseService = courseService;
        this.studentService = studentService;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PostMapping
    public void registerNewCourse(@RequestBody Course course) {
        courseService.addNewCourse(course);
    }

    @PutMapping("{courseName}/students/{ucid}")
    public Course enrollStudentToCourse(@PathVariable String courseName,
                                         @PathVariable String ucid) {
        Course course = courseService.getCourseByCourseName(courseName);
        Student student = studentService.getStudentByUcid(ucid);
        course.enrolledStudents(student);
//        student.enrollCourse(course);
        courseService.updateCourse(course);
//        studentService.updateStudent(student);
        return course;
    }

    @DeleteMapping("{courseName}/students/{ucid}")
    public Course dropCourseForStudent(@PathVariable String courseName,
                                        @PathVariable String ucid) {
        Course course = courseService.getCourseByCourseName(courseName);
        Student student = studentService.getStudentByUcid(ucid);
        course.dropStudent(student);
//        student.enrollCourse(course);
        courseService.updateCourse(course);
//        studentService.updateStudent(student);
        return course;
    }

    @DeleteMapping(path = "{courseName}")
    public void deleteCourse(@PathVariable("courseName") String courseName){
        courseService.deleteCourse(courseName);
    }

    @GetMapping(path = "{courseName}")
    public Optional<Course> searchCourse(@PathVariable("courseName") String courseName){
        return courseService.searchCourse(courseName);
    }
    //MAKE A NEW COURSE
    @PutMapping(path = "{oldCourseName}")
    public void updateCourse(@PathVariable("oldCourseName") String oldCourseName,
                             @RequestParam(required=false) String newCourseName,
                             @RequestParam(required = false) Integer capacity){
        courseService.updateCourse(oldCourseName, newCourseName, capacity);
    }
}
