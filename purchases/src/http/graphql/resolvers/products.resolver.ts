import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/product.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => [Product])
export class ProductResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
