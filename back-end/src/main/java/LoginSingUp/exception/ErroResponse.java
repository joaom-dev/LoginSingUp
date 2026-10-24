package LoginSingUp.exception;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ErroResponse {
    private String message;
    private Integer status;
}
