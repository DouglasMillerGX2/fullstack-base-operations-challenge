import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AggregatedEventDto, RecentEventDto } from './dtos/event.dto';

@ApiTags('Events')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('location/:id/time-series')
  @ApiParam({ name: 'id', type: Number, description: 'Location ID' })
  @ApiResponse({ status: 200, description: 'Three most recent aggregated event days', type: [AggregatedEventDto] })
  async getTimeSeries(@Param('id', ParseIntPipe) id: number) {
    const locationExists = await this.eventService.locationExists(id);
    if (!locationExists) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return this.eventService.getMonthlyTimeSeries(id);
  }

  @Get('location/:id/recent-events')
  @ApiParam({ name: 'id', type: Number, description: 'Location ID' })
  @ApiResponse({ status: 200, description: 'Three most recent events', type: [RecentEventDto] })
  async getRecentEvents(@Param('id', ParseIntPipe) id: number) {
    const locationExists = await this.eventService.locationExists(id);
    if (!locationExists) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return this.eventService.getRecentEvents(id);
  }
}
