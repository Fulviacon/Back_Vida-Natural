import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

 import { PersonaModule } from './persona/persona.module';
import { MensajeModule } from './mensaje/mensaje.module';
import { DonacionesModule } from './donaciones/donaciones.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { Persona } from './persona/entities/persona.entity';
import { Donaciones } from './donaciones/entities/donacione.entity';
import { Mensaje } from './mensaje/entities/mensaje.entity';

@Module({
  imports: [ PersonaModule, MensajeModule, DonacionesModule,
    TypeOrmModule.forRoot({
      type:'cockroachdb',
      host: 'close-lion-15404.7tt.aws-us-east-1.cockroachlabs.cloud',
      port: 26257,
      username:'vidanaturalong',
      password:'jfIHMIrbepPB8F0sBIPXzQ',
      database:'VidaNatural',
      ssl: true,
      entities:[Persona,Donaciones,Mensaje],
      synchronize:true
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
