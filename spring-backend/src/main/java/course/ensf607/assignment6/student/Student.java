package course.ensf607.assignment6.student;

import com.fasterxml.jackson.annotation.JsonIgnore;
import course.ensf607.assignment6.course.Course;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
public class Student implements Serializable {

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_sequence"
    )
    private Long studentId;
    @Column(
            name = "username",
            unique = true
    )
    private String username;
    @Column(
            name = "password"
    )
    private String password;
    @Column(
            name = "ucid"
    )
    private String ucid;

    @JsonIgnore
    @ManyToMany(mappedBy = "enrolledStudents")
    private Set<Course> subjects = new HashSet<Course>();

//    @Column(
//            name = "courses"
//    )
//    @ManyToMany
//    private Set<Course> courses = new HashSet<Course>();

    public Student() {
    }

    public Student(Long id, String username, String password, String ucid, Set<Course> subjects) {
        this.studentId = id;
        this.username = username;
        this.password = password;
        this.ucid = ucid;
        this.subjects = subjects;
    }

    public Student(String username, String password, String ucid, Set<Course> subjects) {
        this.username = username;
        this.password = password;
        this.ucid = ucid;
        this.subjects = subjects;
    }

    /**
     * Initial student constructor where it would have 0 classes (e.g first year students)
     * @param username
     * @param password
     * @param ucid
     */
    public Student(String username, String password, String ucid) {
        this.username = username;
        this.password = password;
        this.ucid = ucid;
//        this.subjects = new HashSet<>();
    }



    public String getUsername() {
        return username;
    }

    public Student setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public Student setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getUcid() {
        return ucid;
    }

    public Student setUcid(String ucid) {
        this.ucid = ucid;
        return this;
    }

    public Set<Course> getSubjects() {
        return subjects;
    }

    public Student setSubjects(Set<Course> subjects) {
        this.subjects = subjects;
        return this;
    }

//    public void enrollCourse(Course course) {courses.add(course);}
}
