import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Injectable()
export class TextService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly logger: Logger,
  ) {}

  async updateText(originalText: string, comment: string, prompt: string, apiKey: string): Promise<string> {
    try {
      this.logger.log('Updating text', { originalText, comment, prompt });
      
      const newText = await this.openAIService.processText(originalText, comment, prompt, apiKey);
      
      this.logger.log('Text updated successfully', { newText });
      return newText;
    } catch (error) {
      this.logger.error('Error updating text', { error });
      throw error;
    }
  }
} 