import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = await this.prisma.employees.create({
        data: {
          name: createEmployeeDto.name,
          phone_number: Number(createEmployeeDto.phone_number),
        },
      });
      return employee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    const employees = await this.prisma.employees.findMany({
      where: {
        is_deleted: false,
      },
    });
    return employees;
  }

  async findOne(id: number) {
    const employee = await this.prisma.employees.findUnique({
      where: {
        id: id,
        is_deleted: false,
      },
    });
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employee = await this.prisma.employees.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!employee) {
        throw new Error('Employee not found');
      }

      const employeeUpdated = await this.prisma.employees.update({
        where: {
          id: id,
        },
        data: {
          name: updateEmployeeDto.name,
          phone_number: Number(updateEmployeeDto.phone_number),
        },
      });

      return employeeUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.prisma.employees.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });
      console.log(employee);
      if (!employee) {
        throw new Error('Employee not found');
      }

      const employeeUpdated = await this.prisma.employees.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });

      return employeeUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
