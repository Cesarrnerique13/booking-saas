import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt'

import { UsersService } from '@/users/users.service';
import { User } from '@/users/entities/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
  private readonly usersService: UsersService,
  @InjectRepository(User)
  private readonly authRepository:Repository<User>,
  private readonly jwtService:JwtService,
) {}

  async create(createAuthDto: RegisterUserDto) {

    const {password, ...userData} = createAuthDto

    const user = await this.usersService.create({
      ...userData,
      password: bcrypt.hashSync(password, 10)
    });
 
     return {
      ...user,
      token: this.getJwtToken({sub:user.id})
    }
  }

  async login(loginUserDto:LoginUserDto) {
    const {password, email} = loginUserDto;

    const user = await this.authRepository.findOne({
      where: {email},
      select:{email:true, password: true, id:true}
    });
    if (!user){
      throw new UnauthorizedException('Credentials are not valid')
    }

    if (!bcrypt.compareSync (password, user.password) ) {
        throw new UnauthorizedException('Credentials are not valid')
    }

    return {
      ...user,
      token: this.getJwtToken({sub:user.id})
    }
  }

  private getJwtToken(paylod:JwtPayload){
    return this.jwtService.sign(paylod);
  }
}