import { IsEmail,IsNotEmpty,IsString,IsNumber,IsDate } from '@nestjs/class-validator';
import { ApiProperty} from '@nestjs/swagger';
 import { CreateScheduleDto } from './create-schedules-dto';

export class UpdateScheduleDto extends CreateScheduleDto{
    //GÜNCELLEME İÇİN KULLANACAĞIMIZ DTO'LAR
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:1
     })
    id:number;
}