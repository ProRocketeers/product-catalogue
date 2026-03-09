import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME')
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD')

    if (!adminUsername || !adminPassword) {
      throw new UnauthorizedException('Admin credentials are not configured')
    }

    if (loginDto.username !== adminUsername || loginDto.password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: adminUsername, role: 'admin' }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
