import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleService {
  constructor(private readonly prisma: PrismaService) {}
  create(createVehicleDto: CreateVehicleDto) {
    try {
      const newVehicle = this.prisma.vehicles.create({
        data: createVehicleDto,
      });
      return newVehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const vehicles = await this.prisma.vehicles.findMany({
        where: {
          is_deleted: false,
        },
      });
      return vehicles;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const vehicle = await this.prisma.vehicles.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      return vehicle;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    try {
      const vehicle = await this.prisma.vehicles.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      const vehicleUpdated = await this.prisma.vehicles.update({
        where: {
          id: id,
        },
        data: updateVehicleDto,
      });

      return vehicleUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const vehicle = await this.prisma.vehicles.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      return this.prisma.vehicles.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
