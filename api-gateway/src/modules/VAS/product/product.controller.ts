import {
    Body,
    Controller,
    Post,
    Query,
    Get,
} from '@nestjs/common';

import { ProductService } from './product.service';
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post('/')
    async create(@Body() data: any) {
        return await this.productService.createProduct(data);
    }

    @Get('/all')
    findAllProducts(@Query() query: any) {
        return this.productService.findAllProducts(query);
    }

    @Get('/workflows')
    getProductWorkflows() {
        return this.productService.getProductWorkflows();
    }
}