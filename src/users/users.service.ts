import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 'cscsd23e23ec',
          username: 'john',
          // password: 'changeme',
          password: '$2b$16$83TRVGAcpwZo8lY4dT2s6O5bFJtuaX16WU3y809CGhYlivb6.99Qu',
        },
        {
          userId: 'casdcutcs8g88',
          username: 'maria',
          // password: 'changeme1',
          password: '6$ma6uEZp5Ma6uxhvHos4VSOXupVUxCBC1PaewwylL/CnYz1LkvbdV.',
        },
      ];

      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
