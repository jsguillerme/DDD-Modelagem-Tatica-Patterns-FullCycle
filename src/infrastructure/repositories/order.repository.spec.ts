import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/models/customer.model";
import OrderModel from "../database/sequelize/models/order.model";
import OrderItemModel from "../database/sequelize/models/oder-item.model";
import ProductModel from "../database/sequelize/models/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('customerId-1', 'John Doe');
    const address = new Address('street-1', 31, 'state-1', 'zipCode-1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('productId-1', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem('item1', product.name, product.price, product.id, 2)

    const order = new Order('order-1', customer.id, [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: 'order-1',
      customer_id: 'customerId-1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id
        }
      ]
    })
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('id-123', 'John Doe');
    const address = new Address('street-1', 31, 'state-1', 'zipCode-1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('prod-123', 'Chocolate', 5);
    await productRepository.create(product);

    const orderItem = new OrderItem('item-123', product.name, product.price, product.id, 10)

    const orderRepository = new OrderRepository();
    const order = new Order('ord-123', customer.id, [orderItem])
    await orderRepository.create(order);

    const product2 = new Product('prod-456', 'Candy', 2);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem('item-456', product2.name, product2.price, product2.id, 5)
    const newOrder = new Order(order.id, customer.id, [orderItem, orderItem2])

    await orderRepository.update(newOrder)

    const orderModel = await OrderModel.findOne({
      where: { id: newOrder.id },
      include: ['items']
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: newOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          product_id: orderItem2.productId,
          order_id: order.id
        }
      ]
    })
  })

  it('should find an order by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('id-123', 'John Doe');
    const address = new Address('street-1', 31, 'state-1', 'zipCode-1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('prod-123', 'Chocolate', 5);
    await productRepository.create(product);

    const orderItem = new OrderItem('item-123', product.name, product.price, product.id, 10)

    const orderRepository = new OrderRepository();
    const order = new Order('ord-123', customer.id, [orderItem])
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id)

    expect(foundOrder).toStrictEqual(order)
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('id-123', 'John Doe');
    const address = new Address('street-1', 31, 'state-1', 'zipCode-1');
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('prod-123', 'Chocolate', 5);
    const product2 = new Product('prod-456', 'Candy', 10);

    Promise.all([
      await productRepository.create(product),
      await productRepository.create(product2)
    ])

    const orderItem = new OrderItem('item-123', product.name, product.price, product.id, 10)
    const orderItem2 = new OrderItem('item-456', product2.name, product2.price, product2.id, 20)

    const orderRepository = new OrderRepository();
    const order = new Order('ord-123', customer.id, [orderItem])
    const order2 = new Order('ord-456', customer.id, [orderItem2])
    
    Promise.all([
      await orderRepository.create(order),
      await orderRepository.create(order2)
    ])

    const foundOrders = await orderRepository.findAll()

    expect(foundOrders).toStrictEqual([order, order2])
  })
});
