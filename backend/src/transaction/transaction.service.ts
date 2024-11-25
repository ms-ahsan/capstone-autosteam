import { transactions } from './../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { retry } from 'rxjs';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTransactionDto: CreateTransactionDto) {
    try {
      // Create new customer
      let newUser = undefined;
      // Check if customer id is null
      if (createTransactionDto.customer.id == null) {
        // Add new customer
        newUser = await this.prisma.customers.create({
          data: {
            name: createTransactionDto.customer.name,
            phone_number: createTransactionDto.customer.phone_number,
          },
        });
      }

      // Add new customer vehicle
      for (
        let i = 0;
        i < createTransactionDto.detail_transactions.length;
        i++
      ) {
        // Check if vehicle id in detail transaction is not null
        if (createTransactionDto.detail_transactions[i].vehicles != null) {
          for (
            let j = 0;
            j < createTransactionDto.detail_transactions[i].vehicles.length;
            j++
          ) {
            // Jika id vehicle null, maka buat new vehicle
            if (
              createTransactionDto.detail_transactions[i].vehicles[j].id == null
            ) {
              // create new vehicle
              const newVehicle = await this.prisma.vehicles.create({
                data: {
                  name: createTransactionDto.detail_transactions[i].vehicles[j]
                    .name,
                  type: createTransactionDto.detail_transactions[i].vehicles[j]
                    .type,
                  plate_number:
                    createTransactionDto.detail_transactions[i].vehicles[j]
                      .plate_number,
                },
              });

              // Add newUser and newVehicle to table customer_vehicle
              const newCustomerVehicle =
                await this.prisma.customer_vehicles.create({
                  data: {
                    customer_id:
                      createTransactionDto.customer.id == null
                        ? newUser.id
                        : createTransactionDto.customer.id,
                    vehicle_id: newVehicle.id,
                  },
                });

              // Add newCustomerVehicle to detail transaction
              createTransactionDto.detail_transactions[i].customer_vehicle_id =
                newCustomerVehicle.id;
            }
            // Jika id vehicle tidak null, maka tidak perlu buat new vehicle
            else {
              // Cek apkah customer vehicle sudah ada berdasarkan id vehicle dan id customer
              const customerVehicle =
                await this.prisma.customer_vehicles.findMany({
                  where: {
                    customer_id:
                      createTransactionDto.customer.id == null
                        ? newUser.id
                        : createTransactionDto.customer.id,
                    vehicle_id:
                      createTransactionDto.detail_transactions[i].vehicles[j]
                        .id,
                    is_deleted: false,
                  },
                });

              if (customerVehicle.length == 0) {
                // Add new customer vehicle
                const newCustomerVehicle =
                  await this.prisma.customer_vehicles.create({
                    data: {
                      customer_id:
                        createTransactionDto.customer.id == null
                          ? newUser.id
                          : createTransactionDto.customer.id,
                      vehicle_id:
                        createTransactionDto.detail_transactions[i].vehicles[j]
                          .id,
                    },
                  });

                // Add newCustomerVehicle to detail transaction
                createTransactionDto.detail_transactions[
                  i
                ].customer_vehicle_id = newCustomerVehicle.id;
              } else {
                // Add customer vehicle id to detail transaction
                createTransactionDto.detail_transactions[
                  i
                ].customer_vehicle_id = customerVehicle[0].id;
              }
            }
          }
        }
      }

      createTransactionDto.code_transaction = `TRX-${Date.now()}`;
      // Add new transaction
      const newTransaction = await this.prisma.transactions.create({
        data: {
          code_transaction: createTransactionDto.code_transaction,
          customer_id:
            createTransactionDto.customer.id == null
              ? newUser.id
              : createTransactionDto.customer.id,
          grand_total: createTransactionDto.grand_total,
          payment_method_id: createTransactionDto.payment_method_id,
          total_payment: createTransactionDto.total_payment,
          money_changes: createTransactionDto.money_changes,
        },
      });

      // Add new detail transaction
      for (
        let i = 0;
        i < createTransactionDto.detail_transactions.length;
        i++
      ) {
        await this.prisma.detail_transactions.create({
          data: {
            transaction_id: newTransaction.id,
            product_id: createTransactionDto.detail_transactions[i].product_id,
            customer_vehicle_id:
              createTransactionDto.detail_transactions[i].customer_vehicle_id,
            quantity: createTransactionDto.detail_transactions[i].quantity,
            total_price:
              createTransactionDto.detail_transactions[i].total_price,
            employee_id: null,
            employees_array_text: createTransactionDto.employees_array_text,
          },
        });
      }

      return newTransaction;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const transactions = await this.prisma.transactions.findMany({
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
          detail_transactions: {
            select: {
              id: true,
              transaction_id: true,
              product_id: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
              customer_vehicle_id: true,
              quantity: true,
              total_price: true,
              employees_array_text: true,
              customer_vehicle: {
                select: {
                  vehicle: {
                    select: {
                      id: true,
                      name: true,
                      type: true,
                      plate_number: true,
                    },
                  },
                  customer: {
                    select: {
                      id: true,
                      name: true,
                      phone_number: true,
                    },
                  },
                },
              },
            },
          },
          payment_method: {
            select: {
              id: true,
              name: true,
              account_number: true,
              an_account_number: true,
            },
          },
        },
      });
      return transactions;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const transaction = await this.prisma.transactions.findUnique({
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
          detail_transactions: {
            select: {
              id: true,
              transaction_id: true,
              product_id: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
              customer_vehicle_id: true,
              quantity: true,
              total_price: true,
              employees_array_text: true,
              customer_vehicle: {
                select: {
                  vehicle: {
                    select: {
                      id: true,
                      name: true,
                      type: true,
                      plate_number: true,
                    },
                  },
                  customer: {
                    select: {
                      id: true,
                      name: true,
                      phone_number: true,
                    },
                  },
                },
              },
            },
          },
          payment_method: {
            select: {
              id: true,
              name: true,
              account_number: true,
              an_account_number: true,
            },
          },
        },
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      return transaction;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    try {
      const transaction = await this.prisma.transactions.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // if transaction not found, throw error
      if (!transaction) {
        throw new Error('Transaction not found');
      }

      console.log('MAKAN BESAR');
      console.log(transaction);
      // return transaction;

      // checking vehicle and customer and in join them customer_vehicle
      // Create new customer if customer id is null
      let newUser = undefined;
      // Check if customer id is null
      if (updateTransactionDto.customer.id == null) {
        // Add new customer
        newUser = await this.prisma.customers.create({
          data: {
            name: updateTransactionDto.customer.name,
            phone_number: updateTransactionDto.customer.phone_number,
          },
        });
      }

      // Add new customer vehicle if customer vehicle id is null
      for (
        let i = 0;
        i < updateTransactionDto.detail_transactions.length;
        i++
      ) {
        // Check if vehicle id in detail transaction is not null
        if (updateTransactionDto.detail_transactions[i].vehicles != null) {
          for (
            let j = 0;
            j < updateTransactionDto.detail_transactions[i].vehicles.length;
            j++
          ) {
            // Jika id vehicle null, maka buat new vehicle
            if (
              updateTransactionDto.detail_transactions[i].vehicles[j].id == null
            ) {
              // create new vehicle
              const newVehicle = await this.prisma.vehicles.create({
                data: {
                  name: updateTransactionDto.detail_transactions[i].vehicles[j]
                    .name,
                  type: updateTransactionDto.detail_transactions[i].vehicles[j]
                    .type,
                  plate_number:
                    updateTransactionDto.detail_transactions[i].vehicles[j]
                      .plate_number,
                },
              });

              // Add newUser and newVehicle to table customer_vehicle
              const newCustomerVehicle =
                await this.prisma.customer_vehicles.create({
                  data: {
                    customer_id:
                      updateTransactionDto.customer.id == null
                        ? newUser.id
                        : updateTransactionDto.customer.id,
                    vehicle_id: newVehicle.id,
                  },
                });

              // Add newCustomerVehicle to detail transaction
              updateTransactionDto.detail_transactions[i].customer_vehicle_id =
                newCustomerVehicle.id;
            }
            // Jika id vehicle tidak null, maka tidak perlu buat new vehicle
            else {
              // Cek apkah customer vehicle sudah ada berdasarkan id vehicle dan id customer
              const customerVehicle =
                await this.prisma.customer_vehicles.findMany({
                  where: {
                    customer_id:
                      updateTransactionDto.customer.id == null
                        ? newUser.id
                        : updateTransactionDto.customer.id,
                    vehicle_id:
                      updateTransactionDto.detail_transactions[i].vehicles[j]
                        .id,
                    is_deleted: false,
                  },
                });

              if (customerVehicle.length == 0) {
                // Add new customer vehicle
                const newCustomerVehicle =
                  await this.prisma.customer_vehicles.create({
                    data: {
                      customer_id:
                        updateTransactionDto.customer.id == null
                          ? newUser.id
                          : updateTransactionDto.customer.id,
                      vehicle_id:
                        updateTransactionDto.detail_transactions[i].vehicles[j]
                          .id,
                    },
                  });

                // Add newCustomerVehicle to detail transaction
                updateTransactionDto.detail_transactions[
                  i
                ].customer_vehicle_id = newCustomerVehicle.id;
              } else {
                // Add customer vehicle id to detail transaction
                updateTransactionDto.detail_transactions[
                  i
                ].customer_vehicle_id = customerVehicle[0].id;
              }
            }
          }
        }
      }

      // Update transaction
      const transactionUpdated = await this.prisma.transactions.update({
        where: {
          id: id,
        },
        data: {
          code_transaction: transaction.code_transaction,
          customer_id:
            updateTransactionDto.customer.id == null
              ? newUser.id
              : updateTransactionDto.customer.id,
          grand_total: updateTransactionDto.grand_total,
          payment_method_id: updateTransactionDto.payment_method_id,
          total_payment: updateTransactionDto.total_payment,
          money_changes: updateTransactionDto.money_changes,
        },
      });

      // Delete all detail_transaction where transaction_id = id
      await this.prisma.detail_transactions.deleteMany({
        where: {
          transaction_id: id,
        },
      });

      // Add new detail transaction
      for (
        let i = 0;
        i < updateTransactionDto.detail_transactions.length;
        i++
      ) {
        await this.prisma.detail_transactions.create({
          data: {
            transaction_id: transaction.id,
            product_id: updateTransactionDto.detail_transactions[i].product_id,
            customer_vehicle_id:
              updateTransactionDto.detail_transactions[i].customer_vehicle_id,
            quantity: updateTransactionDto.detail_transactions[i].quantity,
            total_price:
              updateTransactionDto.detail_transactions[i].total_price,
            employee_id: null,
            employees_array_text: updateTransactionDto.employees_array_text,
          },
        });
      }

      return transactionUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      // find the transaction by id
      const transaction = await this.prisma.transactions.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // Check if the transaction exists
      if (transaction == null) {
        throw new Error('Transaction not found');
      }

      // Soft delete the transaction
      await this.prisma.transactions.update({
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
