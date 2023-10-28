import Customer from "../entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe('Order Service unit test', () => {

  it('should place an order', () => {
    
    const customer = new Customer('id-1', 'customer 1')
    const item1 = new OrderItem('id-item-1', 'item 1', 100, 'id-product-1', 1)


    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(50)
    expect(order.total()).toBe(100)
  })

  it('should get total of all orders', () => {

    const ordemItem1 = new OrderItem('id-1', 'item 1', 100, 'product 1', 1)
    const ordemItem2 = new OrderItem('id-2', 'item 2', 200, 'product 2', 2)
    const ordemItem3 = new OrderItem('id-3', 'item 3', 300, 'product 3', 2)

    const order = new Order('id-1', 'order 1', [ordemItem1])
    const order2 = new Order('id-2', 'order 2', [ordemItem2, ordemItem3])

    const total = OrderService.total([order, order2])

    expect(total).toBe(1100)
  })
})