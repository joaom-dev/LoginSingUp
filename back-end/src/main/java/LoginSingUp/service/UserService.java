package LoginSingUp.service;

import LoginSingUp.config.TokenProvider;
import LoginSingUp.database.entity.RolesEntity;
import LoginSingUp.database.entity.UserEntity;
import LoginSingUp.database.repository.IRolesRepository;
import LoginSingUp.database.repository.IUserRepository;
import LoginSingUp.dto.LoginDto;
import LoginSingUp.dto.TokenDto;
import LoginSingUp.dto.UserDto;
import LoginSingUp.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final String ROLE_USER = "ROLE_USER";

    private final IUserRepository userRepository;
    private final IRolesRepository rolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    public void postUser(UserDto userDto) throws BadRequestException {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new BadRequestException("Usuario já cadastrado com este email");
        }

        RolesEntity roleUser = rolesRepository.findByName(ROLE_USER)
                .orElseThrow(() -> new IllegalStateException("ROLE_USER não cadastrada no banco"));

        userRepository.save(UserEntity.builder()
                .name(userDto.getName())
                .email(userDto.getEmail())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .roles(new HashSet<>(List.of(roleUser)))
                .build());
    }

    public TokenDto login(LoginDto loginDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password()));
            return new TokenDto(tokenProvider.gerarToken(authentication));
        }
        catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
        }
    }

    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> new UserResponseDto(u.getId(), u.getName(), u.getEmail()))
                .toList();
    }

    @Transactional
    public void deleteAccount(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));

        userRepository.delete(user);
    }
}