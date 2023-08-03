import { Injectable,BadRequestException,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

  private StudentData = [
    { "id": 1, "Fullname": "John Doe", "Phone": 9876543210 },
    { "id": 2, "Fullname": "Jane Smith", "Phone": 1234567890 },
    { "id": 3, "Fullname": "Michael Johnson", "Phone": 4567891230 },
    { "id": 4, "Fullname": "Emily Brown", "Phone": 8765432109 },
    { "id": 5, "Fullname": "David Lee", "Phone": 2345678901 }
  ];

  create(createStudentDto: CreateStudentDto) {
    try {
      // Perform validation checks here
      if (!createStudentDto || !createStudentDto.Fullname || !createStudentDto.Phone) {
        throw new BadRequestException('Fullname and Phone are required fields.');
      }
      this.StudentData.push(createStudentDto);
      return 'This action adds a new student';
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Rethrow the original BadRequestException
      } else {
        // Handle other types of errors, if necessary
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
  }

  findAll() {
    // Check if studentData is not null and return it, otherwise return an empty array
    return this.StudentData ? this.StudentData : [];
  }

  findOne(id: number) {
    // Validation: Check if the provided id is a positive number
    if (id <= 0) {
      throw new BadRequestException('Invalid student ID. ID must be a positive number.');
    }
    // Find the student record with the matching id
    const studentRecord = this.StudentData.find(student => student.id === id);
    // If no matching student record is found, throw a NotFoundException
    if (!studentRecord) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
    // Return the found student record
    return studentRecord;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    // Validation: Check if the provided id is a positive number
    if (id <= 0) {
      throw new BadRequestException('Invalid student ID. ID must be a positive number.');
    }

    // Validation: Check if updateStudentDto is valid
    this.validateUpdateStudentDto(updateStudentDto);

    // Find the student record index with the matching id
    const objIndex = this.StudentData.findIndex(obj => obj.id === id);

    // If no matching student record is found, throw a NotFoundException
    if (objIndex === -1) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }

    // Perform the update
    this.StudentData[objIndex] = { ...this.StudentData[objIndex], ...updateStudentDto };

    return `This action updates a #${id} student`;
  }

  private validateUpdateStudentDto(updateStudentDto: UpdateStudentDto) {
    if (!updateStudentDto || (Object.keys(updateStudentDto).length === 0)) {
      throw new BadRequestException('Invalid update data. Update object must contain at least one property to update.');
    }
  }


  remove(id: number) {
    // Validation: Check if the provided id is a positive number
    if (id <= 0) {
      throw new BadRequestException('Invalid student ID. ID must be a positive number.');
    }
    // Find the student record index with the matching id
    const objIndex = this.StudentData.findIndex(obj => obj.id === id);
    // If no matching student record is found, throw a NotFoundException
    if (objIndex === -1) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
    // Remove the student record from the array and return the updated array
    this.StudentData = this.StudentData.filter(student => student.id !== id);
    return `Student with ID ${id} has been successfully removed.`;
  }
}
