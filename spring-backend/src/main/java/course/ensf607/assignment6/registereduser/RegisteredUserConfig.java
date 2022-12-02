package course.ensf607.assignment6.registereduser;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class RegisteredUserConfig {

    @Bean
    CommandLineRunner createUsers(RegisteredUserRepository registeredUserRepository){
        return args -> {
            RegisteredUser user1 = new RegisteredUser(
                    (long) 1,
                    "admin1",
                    "pass",
                    "Joe",
                    "123 Street"
            );
            RegisteredUser user2 = new RegisteredUser(
                    (long) 2,
                    "admin2",
                    "pass",
                    "Jim",
                    "321 Street"
            );

            registeredUserRepository.saveAllAndFlush(
                    List.of(user1, user2)
            );
        };
    };
}
