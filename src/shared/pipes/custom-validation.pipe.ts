import {
  BadRequestException,
  Injectable,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { parseErrorMessageDTO } from '../utils';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((error) => ({
          property: error.property,
          message: parseErrorMessageDTO(error),
        }));
        throw new BadRequestException({ message: 'Validation failed', errors: formattedErrors });
      },
    } as ValidationPipeOptions);
  }
}
