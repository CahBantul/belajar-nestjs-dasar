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
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users')
export class UserController {

    @Get('/view-hello')
    viewHello(@Query('name') name: string, @Res() response: Response){
        response.render('index.html', {
            title: "halo",
            name: "Nozami"
        })
    }

  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name)
    response.status(200).json({ message: `Set cookie for ${name}` });
  }

  @Get('/get-cookie')
  getCookie(@Req() request: Request): string | undefined {
    return request.cookies['name'];
  }

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
    };
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
