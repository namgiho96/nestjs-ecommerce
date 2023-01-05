import { Controller, NotFoundException, Param, Query } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO, FilterProductDTO } from "./dto/product.dto";

@Controller('store/product')
export class ProductController {
  constructor(private productService: ProductService){}

  @Get('/')
  async getProducts(@Query(), filterProductDTO: FilterProductDTO){
    if (Object.keys(filterProductDTO).length) {
      return await this.productService.getFilteredProducts(filterProductDTO);
    } else {
      return await this.productService.getAllProducts();
    }
  }

  @Get('/:id')
  async getProduct(@Param('id'), id: string) {
    const product = await this.productService.getProduct(id);
    if(!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Post('')
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO){
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product dose not exist!');
    return product;
  }

  @Delete()
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product dose not Exist!');
    return product;
  }


}
