// src/event/event.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Location } from '../location/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Location])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
