
import { IsEmail,IsNotEmpty,IsNumber } from '@nestjs/class-validator';
import { ApiProperty, } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto{
    //EKLEME İÇİN KULLANACAĞIMIZ DTO'LAR BURADA EXTENDS ETME İŞLEMİ YAPTIK. BU SAYEDE CREATEUSERDTO'DAKİ ALANLARI KULLANABİLİRİZ

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        example:'Id'
     })
     usr_id:number;
}