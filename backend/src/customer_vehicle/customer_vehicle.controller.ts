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
import { CustomerVehicleService } from './customer_vehicle.service';
import { CreateCustomerVehicleDto } from './dto/create-customer_vehicle.dto';
import { UpdateCustomerVehicleDto } from './dto/update-customer_vehicle.dto';
import { ResponseDto } from 'src/helper/response.dto';
import { JwtGuard } from '../auth/guard';

@Controller('customer-vehicles')
export class CustomerVehicleController {
  constructor(
    private readonly customerVehicleService: CustomerVehicleService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCustomerVehicleDto: CreateCustomerVehicleDto) {
    try {
      const customerVehicle = await this.customerVehicleService.create(
        createCustomerVehicleDto,
      );
      return new ResponseDto(
        'success',
        'Berhasil menambahkan customer kendaraan baru!',
        customerVehicle,
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
      const customerVehicles = await this.customerVehicleService.findAll();
      return new ResponseDto(
        'success',
        'Berhasil mengambil data customer kendaraan!',
        customerVehicles,
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
      const customerVehicle = await this.customerVehicleService.findOne(+id);
      return new ResponseDto(
        'success',
        'Berhasil mengambil data customer kendaraan!',
        customerVehicle,
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
    @Body() updateCustomerVehicleDto: UpdateCustomerVehicleDto,
  ) {
    try {
      const customerVehicleEdited = await this.customerVehicleService.update(
        +id,
        updateCustomerVehicleDto,
      );
      return new ResponseDto(
        'success',
        'Berhasil mengubah data customer kendaraan!',
        customerVehicleEdited,
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
      const customerVehicleDeleted =
        await this.customerVehicleService.remove(+id);

      return new ResponseDto(
        'success',
        'Berhasil menghapus data customer kendaraan!',
        customerVehicleDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
