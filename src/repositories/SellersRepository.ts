import { Seller } from "@prisma/client";
import { prismaClient } from "../database";
import { ICreateSellerDTO, ISellersRepository } from "./ISellersRepository";

class SellersRepository implements ISellersRepository {
  private repository;

  constructor() {
    this.repository = prismaClient.seller;
  }

  async create(data: ICreateSellerDTO): Promise<Seller> {
    const seller = await this.repository.create({
      data
    });

    return seller;
  }

  async findByPhone(phone: string): Promise<Seller | null> {
    const seller = await this.repository.findFirst({
      where: {
        phone,
      },
    });

    return seller;
  }

  async findByUserId(userId: string): Promise<Seller | null> {
    const seller = await this.repository.findFirst({
      where: {
        userId,
      },
    });

    return seller;
  }

  async showById(id: string): Promise<Seller | null> {
    const seller = await this.repository.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
        FeedbackSeller: {
          include: {
            customer: {
              include: {
                user: true
              },
            }
          }
        },
        address: true,
        Favorite: {
          include: {
            customer: true
          }
        }
      }
    });

    return seller;
  }
}

export { SellersRepository };