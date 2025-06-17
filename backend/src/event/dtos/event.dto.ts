import { ApiProperty } from '@nestjs/swagger';

export class MonthlyTimeSeriesDto {
  @ApiProperty({ example: '2023-12-01T00:00:00.000Z' })
  month: string;

  @ApiProperty({ example: 25 })
  total: number;
}

export class RecentEventDto {
  @ApiProperty({ example: 3 })
  count: number;

  @ApiProperty({ example: '2023-12-03T15:00:00.000Z' })
  date: string;

  @ApiProperty({ example: 'Boston' })
  name: string;
}

export class AggregatedEventDto {
    @ApiProperty({ example: '2023-02-30' })
    date: string;
  
    @ApiProperty({ example: 400 })
    total: number;
  
    @ApiProperty({ example: 'New York' })
    name: string;
  }
