import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', 'customer-id', [])
    }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      let order = new Order('order-id', '', [])
    }).toThrowError('CustomerId is required')
  })

  it('should throw error when order list is empty', () => {
    expect(() => {
      let order = new Order('order-id', 'customer-id', [])
    }).toThrowError('Item length must be greater than 0')
  })

  it('should calculate total', () => {
    const item = new OrderItem('item-1', 'item 1', 10, 'product-1', 2)
    const item2 = new OrderItem('item-2', 'item 2', 15, 'product-2', 2)

    const order = new Order('order-1', 'customer-1', [item, item2])
    const total = order.total()

    expect(total).toBe(50)
  })

  it('should throw error when item qtde is less or equal zero', () => {
    expect(() => {
      const item = new OrderItem('item-1', 'item 1', 10, 'product-1', 0)
      const order = new Order('order-1', 'customer-1', [item])
    }).toThrowError('Quantity must be greater than 0')

  })

})