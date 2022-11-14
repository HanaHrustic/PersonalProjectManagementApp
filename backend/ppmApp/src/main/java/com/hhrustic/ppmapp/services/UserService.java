package com.hhrustic.ppmapp.services;

import com.hhrustic.ppmapp.domain.User;
import com.hhrustic.ppmapp.exceptions.UsernameAlreadyExistsException;
import com.hhrustic.ppmapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            return userRepository.save(newUser);
        }catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
    }
}
