import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
   register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post("login")
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.login( loginUserDto );
  }

  @Get("private")
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    @getUser() user: User
  ) {

    return {
      ok: true,
      message: "Hello private world",
      user,
    }
  }
}
