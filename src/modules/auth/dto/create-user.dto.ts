
import { IsEmail,IsNotEmpty,IsString,IsNumber } from '@nestjs/class-validator';
import { ApiProperty, } from '@nestjs/swagger';

export class CreateUserDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:'Canberk Akar'
     })
    name:string;
    @IsEmail()
    @ApiProperty({
        example:'info@deneme.com'
     })
    email:string;
    @IsString()
    @ApiProperty({
        example:'1'
     })
    password:string;
    @IsString()
    @ApiProperty({
        example:'İzmir'
     })
    contact:string;
    @IsString()
    @ApiProperty({
        example:'09999999999'
     })
    phoneNumber:string;
    @IsString()
    @ApiProperty({
        example:'user'
     })
    role:string;
    @IsNumber()
    @ApiProperty({
        example:0
     })
    isPatients:number;
    @IsNumber()
    @ApiProperty({
        example:1
     })
    doctorId:number;
}