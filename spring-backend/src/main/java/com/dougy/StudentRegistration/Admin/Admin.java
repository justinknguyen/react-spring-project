package com.dougy.StudentRegistration.Admin;

import com.dougy.StudentRegistration.User.User;

import javax.persistence.Entity;

@Entity(name = "Admin")
public class Admin extends User {
    private Integer adminID;

    public Admin(String userName,
                 String password,
                 String firstName,
                 String lastName,
                 Integer adminID) {
        super(userName, password, firstName, lastName);
        this.adminID = adminID;
    }

    public Admin() {
    }

    public Integer getAdminID() {
        return adminID;
    }

    public void setAdminID(Integer adminID) {
        this.adminID = adminID;
    }
}
