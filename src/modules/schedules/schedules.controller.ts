import { Controller, Get, Post, Body, Request, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';

@ApiBearerAuth('access-token')
@Controller('schedules')

export class SchedulesController {
    constructor(private readonly schedulesService:SchedulesService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    list(@Request() req) {
      return this.schedulesService.list();
    }
}
