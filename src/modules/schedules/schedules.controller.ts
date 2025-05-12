import { Controller, Get, Post, Body, Request, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedules-dto';
import { UpdateScheduleDto } from './dto/update-schedules-dto';

@ApiTags('Schedules') // Swagger UI'da 'auth' grubu
@ApiBearerAuth('access-token')
@Controller('schedules')

export class SchedulesController {
    constructor(private readonly schedulesService:SchedulesService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    list(@Request() req) {
      return this.schedulesService.list();
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/insert')
    insert(@Body() createScheduleDto:CreateScheduleDto) {
      return this.schedulesService.insert(createScheduleDto);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/update/:id')
    update(@Param('id') scheduleId: number, @Body() body: UpdateScheduleDto) {
      body.id = Number(scheduleId);
      return this.schedulesService.update(body);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id') 
    delete(@Param('id') scheduleId: number) {
      return this.schedulesService.delete(Number(scheduleId));
    }
}
