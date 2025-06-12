import { Controller, Post, Body, UseGuards, Headers, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TextService } from './text.service';

@ApiTags('Text')
@Controller('text')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TextController {
  private readonly logger = new Logger(TextController.name);

  constructor(
    private readonly textService: TextService,
  ) {}

  @Post('update')
  @ApiOperation({ summary: 'Update text using AI' })
  @ApiResponse({ status: 200, description: 'Text updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateText(
    @Body('originalText') originalText: string,
    @Body('comment') comment: string,
    @Body('prompt') prompt: string,
    @Headers('authorization') auth: string,
  ) {
    const apiKey = auth.replace('Bearer ', '');
    this.logger.log(`Text update requested - Original: "${originalText}", Comment: "${comment}", Prompt: "${prompt}"`);
    const newText = await this.textService.updateText(originalText, comment, prompt, apiKey);
    return { newText };
  }
} 