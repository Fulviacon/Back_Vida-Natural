import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, HttpCode,  HttpStatus } from '@nestjs/common';
import { Persona } from './entities/persona.entity';
import {  PersonaDTO } from './dto/create-persona.dto';
import { PersonaService } from './persona.service';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) { }

  @Post()
  @HttpCode(201)
  async create(@Body() datos: PersonaDTO): Promise<Persona> {
    return await this.personaService.crearPersona(datos);
     }

  @Get()
   @HttpCode(200)
  async findAllUsers(): Promise<Persona[]> {
    return await this.personaService.findAllUser();
    
  }

 
  @Get(':id')
  @HttpCode(200)
  async findOneUser(@Param('id', new ParseIntPipe({ 
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Persona> {
    return await this.personaService.findOne(id);
     
  } 


  @Put(':id')
   async updateUser(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND }))
    id: number, @Body() datos: PersonaDTO): Promise<Persona> {
    return await this.personaService.update(id, datos);
   
  }
  @Delete(':id')
  async delete(@Param('id',new ParseIntPipe(
    {errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number):Promise<string>{
    return await this.personaService.softDelete(id);
}


}