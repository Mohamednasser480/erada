import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { StaffGuard } from './guards/staff.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('staff/signIn')
  create(@Body() body:any) {
    return this.authService.validateStaff(body);
  }
  @Get()
  @UseGuards(StaffGuard)

  getStaffByReq(@Request() req) {
    return this.authService.getStaffByReq(req?.headers?.authorization);
  }

 

}
