import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    try {
      const newPaymentMethod = await this.prisma.payment_methods.create({
        data: {
          name: createPaymentMethodDto.name,
          account_number: Number(createPaymentMethodDto.account_number),
          an_account_number: createPaymentMethodDto.an_account_number,
        },
      });
      return newPaymentMethod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const paymentMethods = await this.prisma.payment_methods.findMany({
        where: {
          is_deleted: false,
        },
      });
      return paymentMethods;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const paymentMethod = await this.prisma.payment_methods.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!paymentMethod) {
        throw new Error('Payment method not found');
      }

      return paymentMethod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    try {
      // find the payment method by id
      const paymentMethod = await this.prisma.payment_methods.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // if payment method not found, throw error
      if (!paymentMethod) {
        throw new Error('Payment method not found');
      }

      // update the payment method
      const updatedPaymentMethod = await this.prisma.payment_methods.update({
        where: {
          id: id,
        },
        data: {
          name: updatePaymentMethodDto.name,
          account_number: Number(updatePaymentMethodDto.account_number),
          an_account_number: updatePaymentMethodDto.an_account_number,
        },
      });

      return updatedPaymentMethod;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const paymentMethod = await this.prisma.payment_methods.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      if (!paymentMethod) {
        throw new Error('Payment method not found');
      }

      const paymentMethodUpdated = await this.prisma.payment_methods.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
        },
      });
      return paymentMethodUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
