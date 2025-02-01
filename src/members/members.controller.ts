import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() member: Member): Promise<Member> {
    return this.membersService.create(member);
  }

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  /*@Get(':id')
  findOne(@Param('id') id: number): Promise<Member> {
    return this.membersService.findOne(id);
  }*/

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.membersService.remove(id);
  }
}
