import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.users.findMany();

    // Konversi BigInt menjadi Number
    return users.map((user) => ({
      ...user,
      phone_number: user.phone_number ? Number(user.phone_number) : null,
    }));
  }
}
