import { IsString, IsEmail, IsNotEmpty } from 'class-validator';


export class PersonaDTO {
  @IsNotEmpty()
  @IsString()
  nombreApellido: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

 
}




