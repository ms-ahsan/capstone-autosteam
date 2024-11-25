import { Injectable } from '@nestjs/common';
import { CreateCustomerVehicleDto } from './dto/create-customer_vehicle.dto';
import { UpdateCustomerVehicleDto } from './dto/update-customer_vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerVehicleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCustomerVehicleDto: CreateCustomerVehicleDto) {
    try {
      const newCustomerVehicle = await this.prisma.customer_vehicles.create({
        data: {
          customer_id: Number(createCustomerVehicleDto.customer_id),
          vehicle_id: Number(createCustomerVehicleDto.vehicle_id),
        },
      });

      return newCustomerVehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const customerVehicles = await this.prisma.customer_vehicles.findMany({
        where: {
          is_deleted: false,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone_number: true,
            },
          },
          vehicle: {
            select: {
              id: true,
              name: true,
              type: true,
              plate_number: true,
            },
          },
        },
      });

      return customerVehicles;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      // find the customer by id
      const customerVehicle = await this.prisma.customer_vehicles.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              phone_number: true,
            },
          },
          vehicle: {
            select: {
              id: true,
              name: true,
              type: true,
              plate_number: true,
            },
          },
        },
      });

      // if customer found, return customer
      if (!customerVehicle) {
        throw new Error('CustomerVehicle not found');
      }

      return customerVehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateCustomerVehicleDto: UpdateCustomerVehicleDto) {
    try {
      // find the customer by id
      const customerVehicle = await this.prisma.customer_vehicles.findUnique({
        where: {
          id: id,
        },
      });

      // if customer not found, throw error
      if (!customerVehicle) {
        throw new Error('CustomerVehicle not found');
      }

      // update customer
      const updatedCustomerVehicle = await this.prisma.customer_vehicles.update(
        {
          where: {
            id: id,
          },
          data: {
            customer_id: Number(updateCustomerVehicleDto.customer_id),
            vehicle_id: Number(updateCustomerVehicleDto.vehicle_id),
          },
        },
      );

      return updatedCustomerVehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      // find the customer by id
      const customerVehicle = await this.prisma.customer_vehicles.findUnique({
        where: {
          id: id,
        },
      });

      // if customer not found, throw error
      if (!customerVehicle) {
        throw new Error('CustomerVehicle not found');
      }

      // update customer to change is_deleted to true
      const deletedCustomerVehicle = await this.prisma.customer_vehicles.update(
        {
          where: {
            id: id,
          },
          data: {
            is_deleted: true,
          },
        },
      );

      return deletedCustomerVehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
