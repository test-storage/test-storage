import { Post, Controller, Body, Request, Response, HttpStatus } from '@nestjs/common';

import { AttachmentsService } from './attachments.service';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiUseTags('Attachments')
@Controller('api/v1/attachments')
export class AttachmentsController {

  constructor(private readonly attachmentsService: AttachmentsService) { }

  @Post('/upload')
  async testUpload( @Response() res, @Request() req, @Body('data') data) {
    console.log(req.files);
    console.log(data);
    res.status(HttpStatus.OK).json({ data: 'success' });
  }

}



