import { Controller, Post, Body, Get, UseGuards,Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from '@/common/decorators/raw-headers.decorator';
import type { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("login")
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get("private")
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @
    RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders = {},
  ) {
    return {
      ok: true,
      message: "Hello private world",
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }

  @Get("private2")
  @SetMetadata('roles', ['admin','super-user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user:User
  ) {
    return {
      ok:true,
      user
    }
  }
}
