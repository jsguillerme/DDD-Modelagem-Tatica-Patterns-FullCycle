import Product from "../../../../domain/product/entity/product"
import ProductRepositoryInterface from "../../../../domain/product/repositories/product-repository.interface"
import ProductModel from "./models/product.model"


export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {

    try {
      await ProductModel.create({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      })
    } catch (err) {
      throw new Error('Error creating product...')
    }

  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price,
    }, {
      where: { id: entity.id }
    })
  }

  async find(id: string): Promise<Product> {
    const productDB = await ProductModel.findOne({ where: { id } })

    return new Product(
      productDB.id,
      productDB.name,
      productDB.price
    )
  }

  async findAll(): Promise<Product[]> {
    const productsDB = await ProductModel.findAll()

    return productsDB.map((productDB) => new Product(productDB.id, productDB.name, productDB.price))
  }
}