import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { MensajeDto } from './dto/create-mensaje.dto';

@Injectable()
export class MensajeService {
  constructor(@InjectRepository(Mensaje)  private readonly mensajesRepository: Repository<Mensaje>) {}

  //modifica datos ya existentes
  async updateMensajeById(id: number, datos: MensajeDto): Promise<Mensaje> {
    try {
        let nuevoMensaje = await this.mensajesRepository.findOne( { relations: ['persona'], where:{id} });
        if (!nuevoMensaje) {
            throw new HttpException(`No se encontró el mensaje con ID ${id}`, HttpStatus.NOT_FOUND);
        }

        // Actualizar campos de la persona
        nuevoMensaje.mensaje = datos.mensaje;
      
        // Guardar los cambios en la persona
        nuevoMensaje = await this.mensajesRepository.save(nuevoMensaje);

        return nuevoMensaje;
    } catch (error) {
        throw new HttpException(`Error al actualizar el mensaje con ID ${id}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

//crea un mensaje nuevo
  async crearMensaje(datos: MensajeDto): Promise<Mensaje> {
          
      try {
        const nuevoMensaje = this.mensajesRepository.create(datos);
        return await this.mensajesRepository.save(nuevoMensaje);
    } catch (error) {
        throw new HttpException('No se pudo crear el mensaje', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }

    //trae todos los mensajes
  async getMensaje(): Promise<Mensaje[]> {
    try {
      let criterio: FindManyOptions = { relations: ['persona'] };
      const mensaje:Mensaje[] = await this.mensajesRepository.find(criterio);
      if (mensaje) return mensaje;
      throw new Error(`El fichero mensaje aún está vacío. Por favor, primero ingrese una nueva carga de datos`);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Se produjo un error al intentar obtener los mensajes. Compruebe los datos ingresados e intente nuevamente`
      }, HttpStatus.NOT_FOUND);
    }
  }


  //trae un mensaje
  public async getMensajeById(id: number): Promise<Mensaje> {
    try {
  const criterio : FindOneOptions = { relations:['persona'],where: { id } }
  let mensaje : Mensaje = await this.mensajesRepository.findOne( criterio );
      if (!mensaje) {
        throw new Error('El mensaje no se encuentra');
      }
      return mensaje;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la búsqueda del mensaje ' + id + ' : ' + error.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  //elimina un mensaje
  async deleteMensajeById(id: number, datos: MensajeDto): Promise<string> {
    try {
      const mensaje: Mensaje = await this.getMensajeById(id);
      if (!mensaje) {
        return `El mensaje que desea eliminar no existe en la base de datos`
      } else {
        await this.mensajesRepository.remove(mensaje);
        return `El mensaje ha sido eliminado correctamente de la base de datos`
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Error al intentar eliminar el mensaje  ${datos.mensaje} en la base de datos; ${error}`
      },
        HttpStatus.NOT_FOUND);
    }
  }
  
}