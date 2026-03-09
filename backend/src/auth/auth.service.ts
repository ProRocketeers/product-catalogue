import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME')
    const adminPasswordHash = this.configService.get<string>('ADMIN_PASSWORD_HASH')

    if (!adminUsername || !adminPasswordHash) {
      throw new UnauthorizedException('Admin credentials are not configured')
    }

    if (loginDto.username !== adminUsername) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, adminPasswordHash)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { sub: adminUsername, role: 'admin' }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
