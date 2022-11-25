package com.dougy.StudentRegistration.Student;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository){
        return args -> {
            Student digug = new Student(
                            "digug",
                            "12345",
                            "doug",
                            "yau",
                            30030377
                    );
            Student justin = new Student(
                            "justinn",
                            "123456",
                            "justin",
                            "nyugen",
                            1111111
                    );

            studentRepository.saveAll(
                    List.of(digug, justin)
            );
        };
    };
}
