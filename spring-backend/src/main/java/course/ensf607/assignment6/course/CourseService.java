package course.ensf607.assignment6.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public void addNewCourse(Course course) {
        Optional<Course> courseByName = courseRepository.findByName(course.getName());
        if (courseByName.isPresent()) {
            throw new IllegalStateException("Course already exist!");
        }
        courseRepository.save(course);
    }

    public void updateCourse(Course course) {
        courseRepository.save(course);
    }

    public Course getCourseById(Long courseId) {
        Optional<Course> courseById = courseRepository.findById(courseId);
        if (!courseById.isPresent()) {
            throw new IllegalStateException("Course does'nt exist!");
        }
        return courseById.get();
    }

    public Course getCourseByCourseName(String courseName) {
        Optional<Course> courseByCourseName = courseRepository.findByName(courseName);
        if (!courseByCourseName.isPresent()){
            throw new IllegalStateException("Course does'nt exist!");
        }
        return courseByCourseName.get();
    }

    public void deleteCourse(String courseName) {
        Optional<Course>courseByName = courseRepository.findByName(courseName);
        if (!courseByName.isPresent()){
            throw new IllegalStateException(
                    "course id " + courseName + "does not exist"
            );
        }
        courseRepository.deleteById(courseByName.get().getCourseId());
    }

    public Optional<Course> searchCourse(String courseName) {
        Optional<Course>courseByCourseName = courseRepository.findByName(courseName);
        return courseByCourseName;
    }
    @Transactional
    public void updateCourse(String oldCourseName, String newCourseName, Integer capacity, boolean hasPrerequisite, LocalDate startTime, LocalDate endTime) {
        Course course = courseRepository.findByName(oldCourseName)
                .orElseThrow(() -> new IllegalStateException(
                        "Course id " + oldCourseName + "does not exist"));

        if (newCourseName != null && newCourseName.length() > 0){
            Optional<Course> courseByName = courseRepository.findByName(newCourseName);
            if (courseByName.isPresent()) {
                throw new IllegalStateException("Cannot change name to existing course");
            }
            if (newCourseName.equals(course.getName())){
                throw new IllegalArgumentException("Changing to same course name");
            }
            course.setName(newCourseName);
        }

        if (capacity != null && capacity > 0){
            if (capacity.equals(course.getCapacity())){
                throw new IllegalArgumentException("Changing to same capacity");
            }
            course.setCapacity(capacity);
        }

        if (hasPrerequisite != course.getHasPrerequisite()){
            course.setHasPrerequisite(hasPrerequisite);
        }

        if (startTime != null){
            if (startTime.equals(course.getStartTime())){
                throw new IllegalArgumentException("Changing to same start date");
            }
            course.setStartTime(startTime);
        }
        if (endTime != null){
            if (endTime.equals(course.getStartTime())){
                throw new IllegalArgumentException("Changing to same end date");
            }
            course.setEndTime(endTime);
        }
    }


}
