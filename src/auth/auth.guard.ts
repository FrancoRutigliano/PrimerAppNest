import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // objeto context proporciona info de la request entrante
    const request = context.switchToHttp().getRequest();

    console.log(request.headers.authorization);


    return true
  }
}
