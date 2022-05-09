import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ProductResolver } from './graphql/resolvers/products.resolver';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from 'src/services/product.service';
import { CustomersService } from 'src/services/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Services
    ProductsService,
    ProductsService,
    CustomersService,

    //Resolvers
    ProductResolver,
    ProductResolver,
  ],
})
export class HttpModule {}
