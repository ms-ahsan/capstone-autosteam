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
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { ResponseDto } from 'src/helper/response.dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    try {
      const newPaymentMethod = await this.paymentMethodService.create(
        createPaymentMethodDto,
      );
      return new ResponseDto(
        'success',
        'Berhasil menambahkan metode pembayaran baru!',
        newPaymentMethod,
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
      const paymentMethods = await this.paymentMethodService.findAll();
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua metode pembayaran!',
        paymentMethods,
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
      const paymentMethod = await this.paymentMethodService.findOne(+id);
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan metode pembayaran!',
        paymentMethod,
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
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    try {
      const paymentMethodUpdated = await this.paymentMethodService.update(
        +id,
        updatePaymentMethodDto,
      );

      return new ResponseDto(
        'success',
        'Berhasil memperbarui metode pembayaran!',
        paymentMethodUpdated,
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
      const paymentMethodDeleted = await this.paymentMethodService.remove(+id);

      return new ResponseDto(
        'success',
        'Berhasil menghapus metode pembayaran!',
        paymentMethodDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
