import { Body, Controller, Headers, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MaxLengthPipe, MinLengthPipe } from "./pipe/password.pipe";
import { BasicTokenGuard } from "./guard/basic-token.guard";
import {
  AccessTokenGuard,
  RefreshTokenGuard,
} from "./guard/bearer-token.guard";
import { RegistartUserDto } from "./dto/register-user.dto";
import { IsPubblic } from "src/common/decorator/is-public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("token/access")
  postTokenAccess(@Headers("authorization") rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /**
     * {accessToken: {token}}
     */
    const newToken = this.authService.rotateToken(token, false);

    return {
      accessToken: newToken,
    };
  }

  @Post("token/refresh")
  @IsPubblic()
  @UseGuards(RefreshTokenGuard)
  postTokenRefresh(@Headers("authorization") rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);

    /**
     * {accessToken: {token}}
     */
    const newToken = this.authService.rotateToken(token, true);

    return {
      refreshToken: newToken,
    };
  }

  @Post("login/email")
  @IsPubblic()
  @UseGuards(BasicTokenGuard)
  postLoginEmail(@Headers("authorization") rawToken: string) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post("register/email")
  @IsPubblic()
  postRegisterEmail(
    @Body("nickname") nickname: string,
    @Body() body: RegistartUserDto
  ) {
    return this.authService.registerWithEmail(body);
  }
}
