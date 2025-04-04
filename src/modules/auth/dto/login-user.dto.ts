
import { IsEmail,IsNotEmpty,IsString } from '@nestjs/class-validator';
import { ApiProperty, } from '@nestjs/swagger';

export class LoginUserDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR
  @IsEmail()
  @ApiProperty({
    example:'info@ponline.com'
 }) 
   email: string;
  @IsString()
  @ApiProperty({
    example:'1'
 }) 
   password: string;
}