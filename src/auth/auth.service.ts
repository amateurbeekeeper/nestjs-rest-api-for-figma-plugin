import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
  ) {}

  async validateUser(apiKey: string): Promise<boolean> {
    // In a real application, you would validate against a database
    // For now, we'll use a simple check against an environment variable
    const isValid = apiKey === process.env.API_KEY;
    
    if (!isValid) {
      this.logger.warn(`Invalid API key attempt: ${apiKey}`);
      throw new UnauthorizedException('Invalid API key');
    }
    
    return true;
  }

  async generateToken(apiKey: string): Promise<string> {
    await this.validateUser(apiKey);
    
    const payload = { sub: apiKey };
    const token = this.jwtService.sign(payload);
    
    this.logger.log(`Generated new JWT token for API key: ${apiKey}`);
    return token;
  }
} 