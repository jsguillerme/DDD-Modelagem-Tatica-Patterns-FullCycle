import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import OrderRepositoryInterface from "../../../../domain/checkout/repositories/order-repository.interface"
import OrderItemModel from "./models/oder-item.model"
import OrderModel from "./models/order.model"


export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }
  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({ where: { order_id: entity.id } })
    await OrderItemModel.bulkCreate(entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id
    })))

    await OrderModel.update({
      customer_id: entity.customerId,
      total: entity.total()
    }, {
      where: { id: entity.id }
    })
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: ['items']
    })

    if (!orderModel) {
      throw new Error('Order not found')
    }

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((orderItem) => new OrderItem(orderItem.id, orderItem.name, orderItem.price, orderItem.product_id, orderItem.quantity))
    )

    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ['items']
    })

    return orderModels.map((orderModel) => new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map((orderItem) => new OrderItem(orderItem.id, orderItem.name, orderItem.price, orderItem.product_id, orderItem.quantity))
    ))
  }
}