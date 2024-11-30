import { Module } from '@nestjs/common';
import { DbModule } from './src/db/db.module';
import { UserModule } from './src/user/user.module';
import { RecipeModule } from './src/recipe/recipe.module';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [DbModule, UserModule, RecipeModule, AuthModule], // Importe todos os módulos que contêm controladores e serviços
})
export class AppModule {}
