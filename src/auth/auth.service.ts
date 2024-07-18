import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PersonaService } from 'src/persona/persona.service';

@Injectable()
export class AuthService {
    constructor(private usersService: PersonaService, private jwtService: JwtService) {}
    // se utiliza el servicio del usuario para obtener sus datos, retorna un token provisto por jwt
        async signIn(email: string, pass: string): Promise<{ access_token: string }> {
          //busca si los datos proporcionados coindicen con un usuario creado utilizando el email  
          const user = await this.usersService.findOneUser(email);
          //si no hay usuario creado o la password no coincide con la ingresada retorna no autorizado
            if (!user || user.password !== pass) {
                throw new UnauthorizedException();
            }
                 //sino, si los datos son correctos abtiene el id, el email y el rol 
               const payload = { sub: user.idPersona, name:user.nombreApellido, email:user.email};
               //retorna un token de seguridad creado exclusivamente para ese usuario logueado
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
}
