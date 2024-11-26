import { transactions } from './../../node_modules/.prisma/client/index.d';
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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ResponseDto } from 'src/helper/response.dto';
import { JwtGuard } from '../auth/guard';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      const newTransaction =
        await this.transactionService.create(createTransactionDto);
      return new ResponseDto(
        'success',
        'Transaction created successfully',
        newTransaction,
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
      const transactions = await this.transactionService.findAll();
      return new ResponseDto(
        'success',
        'Transactions fetched successfully',
        transactions,
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
      const transaction = await this.transactionService.findOne(+id);
      return new ResponseDto(
        'success',
        'Transaction fetched successfully',
        transaction,
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
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      const transactionUpdated = await this.transactionService.update(
        +id,
        updateTransactionDto,
      );
      return new ResponseDto(
        'success',
        'Transaction updated successfully',
        transactionUpdated,
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
      const transactionDeleted = await this.transactionService.remove(+id);

      return new ResponseDto(
        'success',
        'Transaction deleted successfully',
        transactionDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
