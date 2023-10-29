import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleLogHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
  handle(event: CustomerChangeAddressEvent): void {
    console.log(`
    Endereço do cliente: ${event.eventData.customerId}, ${event.eventData.customerName} 
    foi alterado para: ${event.eventData.address.street}, ${event.eventData.address.number}, ${event.eventData.address.city}, ${event.eventData.address.zip}`
    )
  }
}