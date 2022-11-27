package course.ensf607.assignment6;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Assignment6Application {

    public static void main(String[] args) {
        SpringApplication.run(Assignment6Application.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry reg){
                reg.addMapping("/**").allowedHeaders("*").allowedOrigins("*").allowedMethods("*");
            }
        };
    }
}
