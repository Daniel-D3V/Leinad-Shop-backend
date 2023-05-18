import { Injectable } from '@nestjs/common';
import { SignupUsecaseFactory } from "@core/domain/dist/src/modules/auth/factories"

@Injectable()
export class AuthService {

  async create(signupDto: any) {
    
    const signupUsecase = SignupUsecaseFactory.create()
    return await signupUsecase.execute(signupDto)

  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: any) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
