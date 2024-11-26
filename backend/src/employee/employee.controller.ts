import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ResponseDto } from '../helper/response.dto';
import { JwtGuard } from '../auth/guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = await this.employeeService.create(createEmployeeDto);
      return new ResponseDto(
        'success',
        'Berhasil menambahkan karyawan baru!',
        newEmployee,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    try {
      const employees = await this.employeeService.findAll();
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua karyawan!',
        employees,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const employee = await this.employeeService.findOne(+id);

      if (!employee) {
        throw new Error('Employee not found');
      }

      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua karyawan!',
        employee,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const employee = await this.employeeService.update(
        +id,
        updateEmployeeDto,
      );
      return new ResponseDto(
        'success',
        'Berhasil mengupdate karyawan!',
        employee,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const employeeDeleted = await this.employeeService.remove(+id);
      return new ResponseDto(
        'success',
        'Berhasil menghapus karyawan!',
        employeeDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
