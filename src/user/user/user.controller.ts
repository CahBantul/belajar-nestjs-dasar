import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { url } from 'inspector';

@Controller('/api/users')
export class UserController {
  @Get('sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return { message: 'Hello World!' };
  }

  @Get('/redirect')
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
        url: '/api/users/sample-response',
        statusCode: 301,
    }
  }

  @Post()
  post(): string {
    return 'This is a POST request';
  }

  @Get('/hello')
  sayHello(@Query('name') name: string) {
    if (name === undefined) {
      return 'Please pass a name as query parameter like /hello?name=John';
    } else {
      return `Hello, ${name}!`;
    }
  }

  @Get('/:id')
  get(@Req() req: Request): string {
    return `Sample GET Request ${req.params.id}`;
  }
}
