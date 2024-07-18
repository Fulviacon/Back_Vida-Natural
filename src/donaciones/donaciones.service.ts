import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Donaciones } from './entities/donacione.entity';
import { DonacionesDto } from './dto/create-donacione.dto';


@Injectable()
export class DonacionesService {
  constructor(@InjectRepository(Donaciones) private donacionesRepository: Repository<Donaciones>) { }
//crea donaciones
  async crearDonacion(datos: DonacionesDto): Promise<Donaciones> {
    try {
      const nuevaDonacion = this.donacionesRepository.create(datos);
      return await this.donacionesRepository.save(nuevaDonacion);
  } catch (error) {
      throw new HttpException('No se pudo crear la donación', HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

//trae todas las donaciones
  public async getDonaciones():Promise<Donaciones[]> {
    try {
      return await this.donacionesRepository.find({ relations: ['persona'] });
  } catch (error) {
      throw new HttpException('Error al intentar obtener las donaciones', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

//trae solo una donacion
public async getDonacionById(id: number): Promise<Donaciones> {
  try {
const criterio : FindOneOptions = { relations:['persona'],where: { id } }
let donacion : Donaciones = await this.donacionesRepository.findOne( criterio );
    if (!donacion) {
      throw new Error('La donación que busca  no se encuentra');
    }
    return donacion;
  } catch (error) {
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'Error en la búsqueda de la donación ' + id + ' : ' + error.message,
      },
      HttpStatus.NOT_FOUND,
    );
  }}

  //modifica datos existentes
  async updateDonacionesById(id: number, datos: DonacionesDto): Promise<Donaciones> {
    try {
      let donacion = await this.getDonacionById( id );
      if (!donacion) {
          throw new HttpException(`No se encontró la persona con ID ${id}`, HttpStatus.NOT_FOUND);
      }

        // Actualizar campos de la donacion
        donacion.monto = datos.monto;
        donacion.fechaDonacion = donacion.fechaDonacion
      
        // Guardar los cambios en la donacion
        donacion= await this.donacionesRepository.save(donacion);

        return donacion;
    } catch (error) {
        throw new HttpException(`Error al actualizar la donacion con ID ${id}: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


//elimina donacion
async deleteDonacionById(id: number, datos: DonacionesDto): Promise<string> {
  try {
    const eliminarDonacion:Donaciones = await this.getDonacionById(id);
    if (!eliminarDonacion) {
      return `La donacion que desea eliminar no existe en la base de datos`
    } else {
      await this.donacionesRepository.remove(eliminarDonacion);
      return `La donacion con fecha ${eliminarDonacion.fechaDonacion} y monto 
      ${eliminarDonacion.monto} ha sido eliminado correctamente de la base de edatos`
    }
  } catch (error) {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: `Error al intentar eliminar la donacion con fecha ${datos.fechaDonacion} en la base de datos; ${error}`
    },
      HttpStatus.NOT_FOUND);
  }
}
}
