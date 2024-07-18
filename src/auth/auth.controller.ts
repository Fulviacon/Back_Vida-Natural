import { Body, Controller, Get, HttpCode, HttpStatus, Post,Request } from "@nestjs/common";
import { LoginDto } from "./login.dto";
import { PersonaService } from "src/persona/persona.service";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: PersonaService) { }

  //login
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }


//acceso al perfil
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}