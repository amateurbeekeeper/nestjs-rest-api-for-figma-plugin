import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger(OpenAIService.name);
  }

  async processText(originalText: string, comment: string, prompt: string, apiKey: string): Promise<string> {
    try {
      this.logger.log('Processing text with OpenAI', { originalText, comment, prompt });

      const openai = new OpenAI({
        apiKey: apiKey,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that updates text based on comments and prompts."
          },
          {
            role: "user",
            content: `Original text: "${originalText}"\nComment: "${comment}"\nPrompt: "${prompt}"\nPlease provide an updated version of the text.`
          }
        ],
      });

      const newText = completion.choices[0].message?.content || originalText;
      this.logger.log('Text processed successfully', { newText });
      
      return newText;
    } catch (error) {
      this.logger.error('Error processing text with OpenAI', { error });
      throw error;
    }
  }
} 