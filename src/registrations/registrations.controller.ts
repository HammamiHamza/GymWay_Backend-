import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  create(@Body() registration: Registration): Promise<Registration> {
    return this.registrationsService.create(registration);
  }

  @Get()
  findAll(): Promise<Registration[]> {
    return this.registrationsService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: number): Promise<Registration> {
    return this.registrationsService.findOne(id);
  }*/

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.registrationsService.remove(id);
  }
}
