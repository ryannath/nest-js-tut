import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { omit } from '../helper/omit';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: number, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    const cleanedUser = omit(user, 'hash');
    return cleanedUser;
  }
}
