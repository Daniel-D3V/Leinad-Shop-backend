import { Injectable } from '@nestjs/common';
import { CategoryEntity } from "@core/domain/dist/src/modules/category/domain/entities"

@Injectable()
export class AuthService {
  create(createAuthDto: any) {
    
    CategoryEntity
  
    console.log(createAuthDto)
    return 'This action adds a new auth';
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
