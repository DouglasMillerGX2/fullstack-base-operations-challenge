import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({ example: 120 })
  id: number;

  @ApiProperty({ example: 'Boston' })
  name: string;

  @ApiProperty({ example: 'America/New_York' })
  timezone: string;
}
