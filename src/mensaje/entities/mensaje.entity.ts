import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('mensaje')
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mensaje: string;

 @ManyToOne(() => Persona, persona => persona.mensaje)
    @JoinColumn({ name: 'idPersona' })
    persona: Persona; 

    

    
    constructor(mensaje: string,persona:Persona) {
        this.mensaje = mensaje;
        this.persona=persona 
    }
}
