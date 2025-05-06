import { Controller, Get, Post, Body, Request, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateAppointmentDto } from './dto/update-appointment-dto';
import { CreateAppointmentDto } from './dto/create-appointment-dto';

@ApiBearerAuth('access-token')
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService:AppointmentsService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    list(@Request() req) {
      return this.appointmentService.list();
    }
    @Post('/insert')
    @UseGuards(AuthGuard('jwt'))
    insert(@Body() createAppointmentDto:CreateAppointmentDto) {
      return this.appointmentService.insert(createAppointmentDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/update/:id')
    update(@Param('id') userId: number, @Body() body: UpdateAppointmentDto) {
      body.id = Number(userId);
      return this.appointmentService.update(body);
    }
}
