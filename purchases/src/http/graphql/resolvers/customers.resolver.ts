import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CustomersService } from 'src/services/customers.service';
import { Customer } from '../models/customer';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
