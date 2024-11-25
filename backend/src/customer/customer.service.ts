import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.prisma.customers.create({
        data: {
          name: createCustomerDto.name,
          phone_number: Number(createCustomerDto.phone_number),
        },
      });
      return customer;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const customers = await this.prisma.customers.findMany({
      where: {
        is_deleted: false,
      },
    });
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.prisma.customers.findUnique({
      where: {
        id: id,
      },
    });
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      const customer = await this.prisma.customers.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!customer) {
        throw new Error('Customer not found');
      }

      const customerUpdated = await this.prisma.customers.update({
        where: {
          id: id,
        },
        data: {
          name: updateCustomerDto.name,
          phone_number: Number(updateCustomerDto.phone_number),
        },
      });

      return customerUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      //find the customer by id
      const customer = await this.prisma.customers.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // if customer not found, throw error
      if (!customer) {
        throw new Error('Customer not found');
      }

      // if customer found, update is_deleted to true
      const customerUpdated = await this.prisma.customers.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });

      return customerUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
