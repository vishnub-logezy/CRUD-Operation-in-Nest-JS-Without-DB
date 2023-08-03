import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}


// create a student details into the database
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log("createStudentDto", createStudentDto);
    return this.studentService.create(createStudentDto);
  }

  // get all students details from the database
  @Get()
  findAll() {
    return this.studentService.findAll();
  }
// Get student single student details
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }
// update student details with student id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  // delete student details with student id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
