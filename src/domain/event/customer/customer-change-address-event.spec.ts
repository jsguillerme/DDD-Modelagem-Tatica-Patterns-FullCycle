import Address from "../../entity/address";
import EventDispatcher from "../@shared/event-dispatcher"
import CustomerChangeAddressEvent from "./customer-change-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogHandler from "./handler/send-console-log.handler";

describe('Customer Change Address Event Test', () => {

  it('should execute handlers when customer change address event is emitted', () => {

    const eventDispatcher = new EventDispatcher();
    const eventLogHandler = new SendConsoleLogHandler();

    const spyEventHandler = jest.spyOn(eventLogHandler, 'handle');

    eventDispatcher.register('CustomerChangeAddressEvent', eventLogHandler);
    expect(eventDispatcher.getEventHandlers['CustomerChangeAddressEvent']).toBeDefined();

    const address = new Address('Street 1', 21, 'City 1', 'Zip 1')

    const customerChangeAddressEvent = new CustomerChangeAddressEvent({
      address,
      customerId: 'customer-1',
      customerName: 'Customer 1'
    })

    eventDispatcher.notify(customerChangeAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  })
})