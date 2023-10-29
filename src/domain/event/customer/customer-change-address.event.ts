import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

interface CustomerChangeAddressEventData {
  customerId: string;
  customerName: string;
  address: Address
}

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerChangeAddressEventData;

  constructor(eventData: CustomerChangeAddressEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}