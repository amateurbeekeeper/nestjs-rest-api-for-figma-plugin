import { Module, Logger } from '@nestjs/common';
import { TextService } from './text.service';
import { TextController } from './text.controller';
import { OpenAIService } from './openai.service';

@Module({
  providers: [TextService, OpenAIService, Logger],
  controllers: [TextController],
})
export class TextModule {} 