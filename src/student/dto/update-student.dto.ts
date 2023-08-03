import { IsNotEmpty, IsOptional, IsNumberString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsOptional()
  @IsNumberString({ no_symbols: true }, { message: 'ID must be a positive integer.' })
  public id: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Fullname cannot be empty.' })
  public Fullname: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Phone number cannot be empty.' })
  @IsNumberString({ no_symbols: true }, { message: 'Phone must be a valid number.' })
  public Phone: number;
}
