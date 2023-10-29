import { Sequelize } from "sequelize-typescript"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/product/entity/product"
import ProductModel from "./models/product.model"

describe('Product Repository Test', () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    
    const productRepository = new ProductRepository()
    const product = new Product('id123', 'product 1', 10)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: 'id123' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: 'id123',
      name: 'product 1',
      price: 10,
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('id123', 'product 1', 10)

    await productRepository.create(product)

    product.changeName('product 2')
    product.changePrice(20)

    await productRepository.update(product)

    const productModel = await ProductModel.findOne({ where: { id: 'id123' } })

    expect(productModel.toJSON()).toStrictEqual({
      id: 'id123',
      name: 'product 2',
      price: 20,
    })
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('id123', 'product 1', 10)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: 'id123' } })
    const foundProduct = await productRepository.find('id123')

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    })
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('id123', 'product 1', 10)
    const product2 = new Product('id456', 'product 2', 20)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const products = [product1, product2]

    const foundProducts = await productRepository.findAll()

    expect(foundProducts.length).toEqual(2)
    expect(products).toEqual(foundProducts)
  })
})