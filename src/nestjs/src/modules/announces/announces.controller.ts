import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';


@Controller('announces')
export class AnnouncesController {
  constructor() {}

  @Post()
  create(@Body() createAnnounceDto: any, @Req() req: Request, @Res() res: Response) {
    console.log(req.currentUser)
  }


}
