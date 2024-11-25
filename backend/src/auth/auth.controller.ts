import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { ResponseDto } from '../helper/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    try {
      const signUp = await this.authService.signup(dto);
      return new ResponseDto('success', 'Berhasil signup!', signUp);
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: SignInDto) {
    try {
      const signUp = await this.authService.signin(dto);
      return new ResponseDto('success', 'Berhasil signup!', signUp);
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
