import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'

import { UsersService } from '@/users/users.service';
import { User } from '@/users/entities/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
constructor(
  private readonly usersService: UsersService,
  @InjectRepository(User)
  private readonly authRepository:Repository<User>
) {}

  async create(createAuthDto: RegisterUserDto):Promise<User> {

    const {password, ...userData} = createAuthDto

    const user = await this.usersService.create({
      ...userData,
      password: bcrypt.hashSync(password, 10)
    });
 
    return user; 
  }

  async login(loginUserDto:LoginUserDto):Promise<User>{
    const {password, email} = loginUserDto;

    const user = await this.authRepository.findOne({
      where: {email},
      select:{email:true, password: true}
    });
    if (!user){
      throw new UnauthorizedException('Credentials are not valid')
    }

    if (!bcrypt.compareSync (password, user.password) ) {
        throw new UnauthorizedException('Credentials are not valid')
    }

    return user;
  }
}