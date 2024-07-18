import {  ConflictException, HttpException, HttpStatus,  Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { PersonaDTO } from './dto/create-persona.dto';


@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private readonly personaRepository: Repository<Persona>) { }
  //crea un usuario
  public async crearPersona(datos: PersonaDTO): Promise<Persona> {

    //si el email ingresado coincide con uno existente no deja crear
    const existingUser = await this.personaRepository.findOne({ where: { email: datos.email } });
    if (existingUser) {
      throw new HttpException('El correo electrónico proporcionado ya está en uso', HttpStatus.CONFLICT);
    }
    try {
      //si los datos ingresado coinciden con los de la dto y si no se proporciona un role, se asigna user por defecto
      let user: Persona;
      if (datos.email && datos.password && datos.nombreApellido ) {
        user = new Persona(datos.nombreApellido, datos.email, datos.password);
     
        //si está todo ok guarda ese user nuevo y lo retorna
        user = await this.personaRepository.save(user);
        return user;
      } else {
        throw new NotFoundException("No se proporcionaron todos los datos necesarios para crear el usuario");
      }
    } catch (error) {
      throw new HttpException('Error en la creación del usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //obtiene todos los usuarios activos y no activos
 
  public async findAllUser(): Promise<Persona[]> {
    try {
      let criterio: FindManyOptions<Persona> = { relations: ['mensaje', 'donaciones'] };
      const users = await this.personaRepository.find(criterio);
      if (users) return users;
      throw new Error('El fichero de usuario está vacio. Debe realizar primero una carga de datos');
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Se produjo un error al intentar obtener los datos. Comprueba la ruta de busqueda e intente nuevamente' + error,
      }, HttpStatus.NOT_FOUND);
    }
  }



  //obtiene un usuario según el email ingresado. método utilizado para el login
  public async findOneUser(email: string): Promise<Persona> {
    try {
      let criterio: FindOneOptions = { where: { email: email } };
      const user = await this.personaRepository.findOne(criterio);
      if (user) return user;
      throw new NotFoundException(`Es usuario al cual hace referencia el id ${email} no se encuentra en la base de datos. Verifique los campos ingresados e intente nuevamente`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Si el error es NotFoundException, simplemente lo relanzamos
        throw error;
      } else if (error.name === 'QueryFailedError') {
        // Manejar errores específicos de TypeORM
        throw new HttpException(
          { status: HttpStatus.INTERNAL_SERVER_ERROR, error: `Error en la consulta a la base de datos. Detalles: ${error.message}` },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      } else {
        // Manejar cualquier otro tipo de error
        throw new InternalServerErrorException(
          `Se produjo un error inesperado al intentar obtener el usuario con email ${email}. Compruebe los datos ingresados e intente nuevamente. Detalles: ${error.message}`
        );
      }
    }
  }

  //obtiene un usuario según el id ingresado haya sido eliminado o no
  public async findOne(id: number): Promise<Persona> {
    try {
      let criterio: FindOneOptions<Persona> = { relations: ['mensaje', 'donaciones'], where: { idPersona: id } };
      const user = await this.personaRepository.findOne(criterio);
      if (user) return user;
      throw new NotFoundException(`El usuario con id ${id} no se encuentra en la base de datos.`);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar obtener el usuario con id ${id}. Compruebe los datos ingresados e intente nuevamente.`,
      }, HttpStatus.NOT_FOUND);
    }
  }

 
  //actualizar datos
  async update(id: number, datos: PersonaDTO): Promise<Persona> {
    try {
      //busco un usuario por id
      let updateUser: Persona = await this.findOne(id);
      //si coinciden los datos obtenidos con los agregados guarda los cambios
      if (updateUser) {
        updateUser.nombreApellido = datos.nombreApellido;
        updateUser.email = datos.email;
        updateUser.password = datos.password;
        updateUser = await this.personaRepository.save(updateUser);
        return updateUser;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar actualizar al usuario de id: ${id} con el nombre ${datos.email} en la base de datos; ${error}`
      },
        HttpStatus.NOT_FOUND);
    }

  }

  async softDelete(id: number): Promise<string> {
    // Busco el producto
    const usuarioExists: Persona = await this.findOne(id);
    // Si el producto no existe, lanzamos una excepcion
    if (!usuarioExists) {
      throw new ConflictException('El usuario con el id ' + id + ' no existe');
    }
   
    await this.personaRepository.remove(usuarioExists);
    return `La persona ${usuarioExists.nombreApellido} ha sido eliminado correctamente de la base de datos`;

  }

}