package course.ensf607.assignment6.course;

import course.ensf607.assignment6.student.Student;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "course")
public class Course implements Serializable {

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Id
    @SequenceGenerator(
            name = "course_sequence",
            sequenceName = "course_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_sequence"
    )
    private Long courseId;
    @Column(
            name = "name",
            unique = true
    )
    private String name;
    @Column(
            name = "start_time"
    )
    private LocalDate startTime;
    @Column(name = "end_time")
    private LocalDate endTime;
    @Column(
            name = "capacity"
    )
    private Integer capacity;
    @Column(
            name = "has_prerequisite"
    )
    private Boolean hasPrerequisite;

    @ManyToMany
    @JoinTable(
            name = "student_enrolled",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> enrolledStudents = new HashSet<>();

    public Course() {
    }

    public Course(Long id, String name, LocalDate startTime, LocalDate endTime, Integer capacity, Boolean hasPrerequisite, Set<Student> enrolledStudents) {
        this.courseId = id;
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.capacity = capacity;
        this.hasPrerequisite = hasPrerequisite;
        this.enrolledStudents = enrolledStudents;
    }

    public Course(String name, LocalDate startTime, LocalDate endTime, Integer capacity, Boolean hasPrerequisite){
        this.name = name;
//        Integer y = Integer.parseInt(startTime.substring(0, 4));
//        Integer m = Integer.parseInt(startTime.substring(5, 7));
//        Integer d = Integer.parseInt(startTime.substring(8));
//        this.startTime = LocalDate.of(y, m, d);
        this.startTime = startTime;
        this.capacity = capacity;
        this.hasPrerequisite = hasPrerequisite;
        this.endTime = endTime;
        this.enrolledStudents = new HashSet<Student>();
    }
//    public Course(String name, LocalDate startTime, LocalDate endTime, Integer capacity, Boolean hasPrerequisite, Set<Student> enrolledStudents) {
//        this.name = name;
//        this.startTime = startTime;
//        this.endTime = endTime;
//        this.capacity = capacity;
//        this.hasPrerequisite = hasPrerequisite;
//        this.enrolledStudents = enrolledStudents;
//    }


    public String getName() {
        return name;
    }

    public Course setName(String name) {
        this.name = name;
        return this;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public Course setStartTime(LocalDate startTime) {
        this.startTime = startTime;
        return this;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public Course setEndTime(LocalDate endTime) {
        this.endTime = endTime;
        return this;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Course setCapacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public Boolean getHasPrerequisite() {
        return hasPrerequisite;
    }

    public Course setHasPrerequisite(Boolean hasPrerequisite) {
        this.hasPrerequisite = hasPrerequisite;
        return this;
    }

    public Set<Student> getEnrolledStudents() {
        return enrolledStudents;
    }

    public Course setEnrolledStudents(Set<Student> enrolledStudents) {
        this.enrolledStudents = enrolledStudents;
        return this;
    }

    public void enrolledStudents(Student student) {
        enrolledStudents.add(student);
    }

    public void dropStudent(Student student) {
        enrolledStudents.remove(student);
    }
}