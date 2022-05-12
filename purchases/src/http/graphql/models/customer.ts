import { Field, ObjectType, ID,Directive } from '@nestjs/graphql';
import { Purchase } from './purchase';


@ObjectType('User')
@Directive('@key(fields: "authUserId")')
@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  puchases: Purchase[];
}
