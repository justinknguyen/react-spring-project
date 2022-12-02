package course.ensf607.assignment6.registereduser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegisteredUserService {

    private final RegisteredUserRepository registeredUserRepository;

    @Autowired
    public RegisteredUserService(RegisteredUserRepository registeredUserRepository) {
        this.registeredUserRepository = registeredUserRepository;
    }

    public List<RegisteredUser> getAllRegisteredUsers() {
        return registeredUserRepository.findAll();
    }

    public void addNewUser(RegisteredUser registeredUser) {
        Optional<RegisteredUser> user = registeredUserRepository.findByEmail(registeredUser.getEmail());
        if (user.isPresent()) {
            throw new IllegalStateException("User already exists!");
        }
        registeredUserRepository.save(registeredUser);
    }

    // public Course getCourseById(Long courseId) {
    // Optional<Course> courseById = courseRepository.findById(courseId);
    // if (!courseById.isPresent()) {
    // throw new IllegalStateException("Course does'nt exist!");
    // }
    // return courseById.get();
    // }
}
