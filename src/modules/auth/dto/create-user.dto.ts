
import { IsEmail,IsNotEmpty,IsString } from '@nestjs/class-validator';
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
}