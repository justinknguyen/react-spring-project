//package course.ensf607.assignment6.student;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import java.util.List;
//
//@Configuration
//public class StudentConfig {
//
//    @Bean
//    CommandLineRunner commandLineRunner(StudentRepository studentRepository){
//        return args -> {
//            Student doug = new Student(
//                    "digug",
//                    "12345",
//                    "30030377",
//                    null
//
//            );
//            Student justin = new Student(
//                    "justinn",
//                    "123456",
//                    "1111111",
//                    null
//
//            );
//
//            studentRepository.saveAll(
//                    List.of(doug, justin)
//            );
//        };
//    };
//}