package LoginSingUp.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter


public class UserDto {

    @NotNull
    private String name;

    @NotNull
    private String email;

    @NotNull
    private String password;
}
