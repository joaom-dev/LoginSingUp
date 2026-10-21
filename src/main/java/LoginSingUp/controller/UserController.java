package LoginSingUp.controller;

import LoginSingUp.dto.UserDto;
import LoginSingUp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/juao/project")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/sing-up")
    @ResponseStatus(HttpStatus.CREATED)
    public void postUser (@Valid @RequestBody UserDto userDto) throws BadRequestException {
        userService.postUser(userDto);
    }
}
