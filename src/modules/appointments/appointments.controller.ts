import { Controller, Get, Post, Body, Request, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService:AppointmentsService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    list(@Request() req) {
      return this.appointmentService.list();
    }
}
