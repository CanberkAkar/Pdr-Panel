import { IsEmail,IsNotEmpty,IsString,IsNumber,IsDate } from '@nestjs/class-validator';
import { ApiProperty} from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment-dto';

export class UpdateAppointmentDto extends CreateAppointmentDto{
    //GÜNCELLEME İÇİN KULLANACAĞIMIZ DTO'LAR
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:1
     })
    id:number;
}