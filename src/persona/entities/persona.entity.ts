import { Donaciones } from 'src/donaciones/entities/donacione.entity';
import { Mensaje } from 'src/mensaje/entities/mensaje.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
/* import { Mensaje } from './mensajes.entity';
import { Donaciones } from './donaciones.entity';
 */
@Entity('persona')
export class Persona {
    @PrimaryGeneratedColumn()
    idPersona: number;

    @Column({nullable:false})
    nombreApellido: string;
    
    @Column()
    email: string;

    @Column()
    password: string;
    
    @OneToMany(() => Mensaje, mensaje => mensaje.persona)
    mensaje: Mensaje[];

    @OneToMany(() => Donaciones, donacion => donacion.persona)
    donaciones: Donaciones[]; 

    //en el constructor no va el id
    constructor(nombreApellido: string, email: string, password: string) {
        this.nombreApellido = nombreApellido;
        this.email = email;
        this.password = password;
    }
}
