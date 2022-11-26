package course.ensf607.assignment6.course;

import course.ensf607.assignment6.student.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@Configuration
public class CourseConfig {
    @Bean
    CommandLineRunner createCourse(CourseRepository courseRepository){
        return args -> {
            Course one = new Course(
                    "ENSF607",
                    LocalDate.now(),
                    LocalDate.now().plusMonths(4),
                    60,
                    false,
                    new HashSet<Student>()
            );

            Course two = new Course(
                    "ENSF608",
                    LocalDate.now(),
                    LocalDate.now().plusMonths(4),
                    60,
                    false,
                    new HashSet<Student>()
            );

            Course three = new Course(
                    "ENSF611",
                    LocalDate.now(),
                    LocalDate.now().plusMonths(4),
                    60,
                    false,
                    new HashSet<Student>()
            );

            Course four = new Course(
                    "ENSF614",
                    LocalDate.now(),
                    LocalDate.now().plusMonths(4),
                    60,
                    false,
                    new HashSet<Student>()
            );

            courseRepository.saveAll(
                    List.of(
                            one, two, three, four
                    )
            );
        };
    }
}
