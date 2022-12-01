package course.ensf607.assignment6.course;

import course.ensf607.assignment6.student.Student;
import course.ensf607.assignment6.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
        // Student can only reg for max 6 courses
        if (student.getSubjects().size() >= 6){
            throw new IllegalArgumentException("Cannot enroll for more than 6 classes");
        }
        // Course can only reg up to its capacity
        if (course.getEnrolledStudents().size() >= course.getCapacity()){
            throw new IllegalArgumentException("Course is full!");
        }
        course.enrolledStudents(student);
        courseService.updateCourse(course);
        return course;
    }

    @DeleteMapping("{courseName}/students/{ucid}")
    public Course dropCourseForStudent(@PathVariable String courseName,
                                        @PathVariable String ucid) {
        Course course = courseService.getCourseByCourseName(courseName);
        Student student = studentService.getStudentByUcid(ucid);
        course.dropStudent(student);
        courseService.updateCourse(course);
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

    @PutMapping(path = "{oldCourseName}")
    public void updateCourse(@PathVariable("oldCourseName") String oldCourseName,
                             @RequestParam(required=false) String newCourseName,
                             @RequestParam(required = false) Integer capacity,
                             @RequestParam boolean hasPrerequisite,
                             @RequestParam(required = false)
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startTime,
                             @RequestParam(required = false)
                             @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endTime){
        courseService.updateCourse(oldCourseName, newCourseName, capacity, hasPrerequisite, startTime, endTime);
    }
}
