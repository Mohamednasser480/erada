import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { RESPONSE_MESSAGES } from '../types/responseMessages';

export abstract class BaseService {
  protected _getBadRequestError(message: string) {
    throw new BadRequestException({ message });
  }
  protected _getInternalServerError(message: string) {
    throw new InternalServerErrorException({ message });
  }

  protected _getNotFoundError(message: string) {
    throw new NotFoundException({ message });
  }
  protected _getUnauthorized(message: string) {
    throw new UnauthorizedException({ message });
  }
}
