import Address from "../object-values/address"
import Customer from "./customer"

describe('Customer unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'John')
    }).toThrowError('Id cannot be empty')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '')
    }).toThrowError('Name cannot be empty')
  })

  it('should change name', () => {
    let customer = new Customer('123', 'John')

    customer.changeName('Jane')
    
    expect(customer.name).toBe('Jane')
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 4, '61902311', 'São Paulo')

    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1')

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1')
      customer.activate()
    }).toThrowError('Address cannot be empty')
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1')
    expect(customer.rewardPoints).toBe(0)
    
    customer.addRewardPoints(100)
    expect(customer.rewardPoints).toBe(100)

    customer.addRewardPoints(100)
    expect(customer.rewardPoints).toBe(200)
  })
})