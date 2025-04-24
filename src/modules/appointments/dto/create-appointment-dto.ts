
import { IsEmail,IsNotEmpty,IsString,IsNumber,IsDate } from '@nestjs/class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class CreateAppointmentDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:1
     })
    psychologistId:number;
    @IsEmail()
    @ApiProperty({
        example:'test'
     })
    patientName:string;
    @IsString()
    @ApiProperty({
        example:1
     })
    patientId:number;
    @IsDate()
    @ApiProperty({
        example:'İzmir'
     })
    duration:string;
    @IsString()
    @ApiProperty({
        example:'pending'
     })
    status:string;
    @IsString()
    @ApiProperty({
        example:'test'
     })
     notes:string;
}