import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty()
  @IsNumberString({ no_symbols: true }, { message: 'ID must be a positive integer.' })
  public id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Fullname cannot be empty.' })
  public Fullname: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone number cannot be empty.' })
  @IsNumberString({ no_symbols: true }, { message: 'Phone must be a valid number.' })
  public Phone: number;
}