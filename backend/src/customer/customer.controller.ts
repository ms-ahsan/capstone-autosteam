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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResponseDto } from '../helper/response.dto';
import { JwtGuard } from '../auth/guard';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const newEmployee = await this.customerService.create(createCustomerDto);
      return new ResponseDto(
        'success',
        'Berhasil menambahkan customer baru!',
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
      const customers = await this.customerService.findAll();
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua pelanggan!',
        customers,
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
      const customer = await this.customerService.findOne(+id);

      if (!customer) {
        throw new Error('Customer not found');
      }

      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua products!',
        customer,
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
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    try {
      const customer = await this.customerService.update(
        +id,
        updateCustomerDto,
      );

      return new ResponseDto(
        'success',
        'Berhasil mengupdate karyawan!',
        customer,
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
      const customerDeleted = await this.customerService.remove(+id);

      return new ResponseDto(
        'success',
        'Berhasil menghapus pelanggan!',
        customerDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
