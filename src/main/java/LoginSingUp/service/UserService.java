package LoginSingUp.service;


import LoginSingUp.config.PasswordConfig;
import LoginSingUp.database.entity.UserEntity;
import LoginSingUp.database.repository.IUserRepository;
import LoginSingUp.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void postUser(UserDto userDto) throws BadRequestException {
        UserEntity user = userRepository.findByEmail(userDto.getEmail())
                .orElse(null);

        if (user != null) {
            throw new BadRequestException("Usuario já cadastrado com este email");
        }

        userRepository.save(UserEntity.builder()
                .name(userDto.getName())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .build());
    }

}
