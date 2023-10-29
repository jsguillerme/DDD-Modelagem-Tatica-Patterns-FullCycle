import EventDispatcher from "../@shared/event-dispatcher"
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLogOneHandler from "./handler/send-console-log-one.handler";
import SendConsoleLogTwoHandler from "./handler/send-console-log-two.handler";

describe('Customer Created Event Test', () => {

  it('should execute handlers when customer created event is emitted', () => {

    const eventDispatcher = new EventDispatcher();
    const eventLogOneHandler = new SendConsoleLogOneHandler();
    const eventLogTwoHandler = new SendConsoleLogTwoHandler();

    const spyEventHandlerOne = jest.spyOn(eventLogOneHandler, 'handle');
    const spyEventHandlerTwo = jest.spyOn(eventLogTwoHandler, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', eventLogOneHandler);
    eventDispatcher.register('CustomerCreatedEvent', eventLogTwoHandler);

    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toBeDefined();
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toBeDefined();

    const customerCreatedEvent = new CustomerCreatedEvent({
      customerId: 1,
      customerName: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        city: 'City 1',
        zip: 'Zip 1'
      }
    })

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerOne).toHaveBeenCalled();
    expect(spyEventHandlerTwo).toHaveBeenCalled();
  })
})