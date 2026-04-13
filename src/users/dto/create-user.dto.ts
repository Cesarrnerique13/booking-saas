import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsEmail,IsNotEmpty,IsOptional,IsString, Matches, MaxLength} from 'class-validator'

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @ApiProperty({example:'juan', description:'user`s name'})
    name:string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @IsEmail()
    @ApiProperty({ example:'juan@gmail.com', description: 'user`s email' })
    email: string;

    @IsOptional()
    @IsString()
    @Matches(/^\+?[0-9]+$/,{message: 'Phone debe tener solo numeros'})
    @MaxLength(15)
    @ApiPropertyOptional({example: "04246785932", description: "User`s phone" })
    phone?:string;
}