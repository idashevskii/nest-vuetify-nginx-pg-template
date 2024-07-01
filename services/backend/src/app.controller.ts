import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';

import { Entity, PrimaryGeneratedColumn, Column, EntityManager } from 'typeorm';

@Entity()
export class UserSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;
}

@Controller('v1')
export class AppController {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:id/settings')
  async getUserSettings(@Param('id') id: string) {
    return this.entityManager.find(UserSettings);
  }

  @Put('user/:id/settings')
  async setUserSettings(
    @Param('id') id: string,
    @Body() input: UserSettings[],
  ) {
    const existsingSettings = await this.entityManager.find(UserSettings);
    const map: Map<string, UserSettings> = new Map();
    for (const existing of existsingSettings) {
      map.set(existing.key, existing);
    }
    for (const s of input) {
      if (!map.has(s.key)) {
        this.entityManager.insert(UserSettings, s);
      } else {
        const existing = map.get(s.key);
        if (existing.value !== s.value) {
          existing.value = s.value;
          this.entityManager.save(existing);
        }
      }
    }
    return {};
  }
}
