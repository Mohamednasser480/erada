import {
    Body,
    Controller,
    Post,
    Get,
    Query,
} from '@nestjs/common';
import {
    getValidationSchema,
    YupValidationPipe,
} from '../../utils/validation.pipes';
import {
    productSchema
} from './product.schema';
import { CreateProductDto } from './product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post('/')
    async createProduct(
        @Body(new YupValidationPipe(getValidationSchema(productSchema)))
            data: CreateProductDto
    ) {
        return await this.productService.createProduct(data);
    }

    @Get('/all')
    getProducts(@Query() query: any) {
        return this.productService.getProducts(query);
    }

    @Get('/workflows')
    getProductWorkflows() {
        return this.productService.getProductWorkflows();
    }
}