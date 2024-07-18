import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { PersonaModule } from 'src/persona/persona.module';
import { Persona } from 'src/persona/entities/persona.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaService } from 'src/persona/persona.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([Persona]),

  JwtModule.register({
    global:true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn:'1h'},
  })
  ],
  controllers: [AuthController],
  providers: [AuthService,PersonaService],
  exports: [AuthService]
})
export class AuthModule {}