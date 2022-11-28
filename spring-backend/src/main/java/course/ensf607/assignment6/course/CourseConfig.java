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
                    LocalDate.of(2022, 3, 21),
                    60,
                    false
            );

            Course two = new Course(
                    "ENSF608",
                    LocalDate.of(2022, 1, 23),
                    60,
                    false
            );

            Course three = new Course(
                    "ENSF611",
                    LocalDate.of(2022, 5, 22),
                    60,
                    false
            );

            Course four = new Course(
                    "ENSF615",
                    LocalDate.of(1999, 1, 2),
                    60,
                    false
            );

            courseRepository.saveAllAndFlush(
                    List.of(
                            one, two, three, four
                    )
            );
        };
    }
}
