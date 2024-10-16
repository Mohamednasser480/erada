import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        forwardRef(() => AuthModule)
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
