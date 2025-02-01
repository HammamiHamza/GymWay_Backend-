import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MembershipTypesService } from './membership-types.service';
import { MembershipType } from './membership-type.entity';

@Controller('membership-types')
export class MembershipTypesController {
  constructor(private readonly membershipTypesService: MembershipTypesService) {}

  @Post()
  create(@Body() membershipType: MembershipType): Promise<MembershipType> {
    return this.membershipTypesService.create(membershipType);
  }

  @Get()
  findAll(): Promise<MembershipType[]> {
    return this.membershipTypesService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: number): Promise<MembershipType> {
    return this.membershipTypesService.findOne(id);
  }*/

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.membershipTypesService.remove(id);
  }
}
