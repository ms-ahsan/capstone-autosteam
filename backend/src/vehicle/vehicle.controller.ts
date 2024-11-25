import { vehicles } from './../../node_modules/.prisma/client/index.d';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ResponseDto } from 'src/helper/response.dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto) {
    try {
      const newVehicle = await this.vehicleService.create(createVehicleDto);
      return new ResponseDto(
        'success',
        'Berhasil menambahkan kendaraan baru!',
        newVehicle,
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
      const vehicles = await this.vehicleService.findAll();
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua kendaraan!',
        vehicles,
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
      const vehicle = await this.vehicleService.findOne(+id);
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan kendaraan!',
        vehicle,
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
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    try {
      const vehicleUpdated = await this.vehicleService.update(
        +id,
        updateVehicleDto,
      );
      return new ResponseDto(
        'success',
        'Berhasil mengupdate kendaraan!',
        vehicleUpdated,
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
      const verhicleDeleted = await this.vehicleService.remove(+id);

      return new ResponseDto(
        'success',
        'Berhasil menghapus kendaraan!',
        verhicleDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
