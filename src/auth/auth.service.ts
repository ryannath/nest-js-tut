import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { omit } from 'src/helper/omit';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
      },
    });
    // return the saved user
    const cleanedUser = omit(user, 'hash');
    return cleanedUser;
  }

  signin(dto: AuthDto) {
    console.log(dto);
    return { message: 'Successfully signed in' };
  }
}
