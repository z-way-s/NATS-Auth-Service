import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { USER_SERVICE } from 'src/app.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_SERVICE) readonly userProxy: ClientProxy,
  ) {}

  validateUser(login: string, password: string): Observable<any> {
    const user = this.userProxy.send(
      { cmd: 'user.login' },
      { login, password },
    );
    return user;
  }

  async login(user: any) {
    let result;
    try {
      result = await this.validateUser(user.login, user.password);
    } catch (err) {
      return {
        status: 'error',
        message: 'Invalid username or password',
      };
    }
    if (result.status === 'error') {
      return {
        status: 'error',
        message: 'Invalid username or password',
      };
    }
    const payload = { login: user.login, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
