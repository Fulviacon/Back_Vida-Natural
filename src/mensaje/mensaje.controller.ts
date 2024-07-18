import { Controller, Post, Body, HttpException, HttpStatus, Get, HttpCode, Put, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { Mensaje } from './entities/mensaje.entity';
import { MensajeDto } from './dto/create-mensaje.dto';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}  

  //retorna todos los mensajes
@Get()
  @HttpCode(200)
  async getMensaje(): Promise<Mensaje[]> {
    return await this.mensajeService.getMensaje();
  }

//retorna un mensaje que es buscado por el id
  @Get(':id')
  async getMensajeById(@Param('id', new ParseIntPipe()) id: number): Promise<Mensaje> {
    const mensaje = await this.mensajeService.getMensajeById(id);
    if (mensaje) return mensaje;
      }

      //crea un mensaje pasandole por el body los datos de la DTO
  @Post()
  async crearMensaje(@Body() mensajeDto: MensajeDto): Promise<Mensaje> {
    return await this.mensajeService.crearMensaje(mensajeDto);
    
  }

  //modifica los datos existentes utilizando el id del mensaje a modificar en la ruta y
  //la dto como body para modifcar esos datos
   @Put(':id')
  async updateMensajeById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() datos: MensajeDto ): Promise<Mensaje> {
      return await this.mensajeService.updateMensajeById(id, datos);
    
    }

    //elimina un mensaje segun el id especificado
    @Delete(':id')
    @HttpCode(200)
    async deleteMensajeID( @Param( 'id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      )  id: number, datos:Mensaje ):Promise<string> {
     return await this.mensajeService.deleteMensajeById(id,datos);
     
    }
  }