package com.dougy.StudentRegistration.User;

import com.dougy.StudentRegistration.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
