package LoginSingUp.controller;

import LoginSingUp.dto.UserResponseDto;
import LoginSingUp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/juao/users")
@RequiredArgsConstructor
public class UserAdminController {

    private final UserService userService;

    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        return userService.getAllUsers();
    }
}