import RepositoryInterface from "../../@shared/repositories/repository-interface";
import Customer from "../entity/customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
