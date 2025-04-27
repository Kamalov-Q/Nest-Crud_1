import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'john_doe', description: 'The username for the user' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'StrongPassword123!', description: 'The user\'s password' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'admin', description: 'The role of the user', required: false })
    @IsString()
    @IsOptional()
    role: string;
}
