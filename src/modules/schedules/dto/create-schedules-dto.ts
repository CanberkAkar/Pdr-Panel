
import { IsEmail,IsNotEmpty,IsString,IsNumber,IsDate } from '@nestjs/class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class CreateScheduleDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:1
     })
    psychologistId:number;
    @IsEmail()
    @ApiProperty({
        example:'canberk'
     })
    patientName:string;
    @IsString()
    @ApiProperty({
        example:1
     })
    patientId:number;
    @IsDate()
    @ApiProperty({
        example:'03.07.1998'
     })
    day:Date;
    @IsString()
    @ApiProperty({
        example:'12.00'
     })
     startTime:string;
    @IsString()
    @ApiProperty({
        example:'13.00'
     })
     endTime:string;
     @IsString()
     @ApiProperty({
         example:'pending'
      })
      status:string;
      @IsString()
     @ApiProperty({
         example:'iptal olabilir'
      })
      note:string; 
}