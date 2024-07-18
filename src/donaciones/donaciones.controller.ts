import { Controller, Post, Body, HttpCode, Get, HttpException, HttpStatus, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { DonacionesService } from './donaciones.service';
import { DonacionesDto } from './dto/create-donacione.dto';
import { Donaciones } from './entities/donacione.entity';


@Controller('donaciones')
export class DonacionesController {
  constructor(private readonly donacionesService: DonacionesService) { }
  //crea una donacion utilizando como cuerpo la dto
  @Post()
  @HttpCode(201)
  async crearDonacion(@Body() donacionesDto: DonacionesDto): Promise<Donaciones> {
    return await this.donacionesService.crearDonacion(donacionesDto);
  }

  //retorna todas las donaciones
  @Get()
  @HttpCode(200)
  async getDonaciones(): Promise<Donaciones[]> {
    return await this.donacionesService.getDonaciones();
  }


  //retorna una donacion que es buscado por el id
  @Get(':id')
  async getDonacionById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number): Promise<Donaciones> {
    const mensaje = await this.donacionesService.getDonacionById(id);
    if (mensaje) return mensaje;
  }

  //modifica los datos existentes utilizando el id del mensaje a modificar en la ruta y
  //la dto como body para modifcar esos datos
  @Put(':id')
  async updateDonacionById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number, @Body() datos: DonacionesDto): Promise<Donaciones> {
    return await this.donacionesService.updateDonacionesById(id, datos);

  }


  //elimina una donacion existente

  @Delete(':id')
  @HttpCode(200)
  async deleteDonacionByID(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  ) id: number, datos: DonacionesDto): Promise<string> {
    return await this.donacionesService.deleteDonacionById(id, datos);
  }
}