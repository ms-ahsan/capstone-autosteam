import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { put, head, del } from '@vercel/blob';
export const runtime = 'edge';
import * as fs from 'fs';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    try {
      // Process the uploaded file ----------------------------
      // Membaca file dari sistem file lokal
      const fileBuffer = fs.readFileSync(createProductDto.image_file.path);

      // Konversi ke File
      const vercelFile = new File(
        [fileBuffer],
        createProductDto.image_file.originalname,
        {
          type: createProductDto.image_file.mimetype,
        },
      );

      // Unggah ke Vercel Blob
      const result = await put(`/products/${vercelFile.name}`, vercelFile, {
        access: 'public',
      });

      // Hapus file sementara setelah diunggah
      fs.unlinkSync(createProductDto.image_file.path);

      createProductDto.code = `PRD-${Date.now()}`;
      const product = await this.prisma.products.create({
        data: {
          code: createProductDto.code,
          image_url: result.url,
          name: createProductDto.name,
          price: Number(createProductDto.price),
          type: createProductDto.type,
          stock: Number(createProductDto.stock),
        },
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.products.findMany({
        where: {
          is_deleted: false,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.products.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // Check if the product exists
      if (product == null) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prisma.products.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // Check if the product exists
      if (product == null) {
        // Hapus file
        fs.unlinkSync(updateProductDto.image_file.path);
        throw new Error('Product not found');
      }

      // Process the file ----------------------------
      // Delete image existing from vercel blob
      if (updateProductDto.image_file != null) {
        // Delete image existing from vercel blob
        const getImageBlob = await head(product.image_url);

        // Check if the image not exists
        if (getImageBlob == null) {
          throw new Error('Image not found');
        }

        // Delete image existing from vercel blob
        await del(product.image_url);

        // Upload image again to vercel blob
        // Membaca file dari sistem file lokal
        const fileBuffer = fs.readFileSync(updateProductDto.image_file.path);
        // Konversi ke File
        const vercelFile = new File(
          [fileBuffer],
          updateProductDto.image_file.originalname,
          {
            type: updateProductDto.image_file.mimetype,
          },
        );

        // Unggah ke Vercel Blob
        const result = await put(`/products/${vercelFile.name}`, vercelFile, {
          access: 'public',
        });

        // Hapus file sementara setelah diunggah
        fs.unlinkSync(updateProductDto.image_file.path);

        const productUpdated = await this.prisma.products.update({
          where: {
            id: id,
          },
          data: {
            code: product.code,
            image_url: result.url,
            name: updateProductDto.name,
            price: Number(updateProductDto.price),
            type: updateProductDto.type,
            stock: Number(updateProductDto.stock),
          },
        });
        return productUpdated;
      }

      const productUpdated = await this.prisma.products.update({
        where: {
          id: id,
        },
        data: {
          code: product.code,
          image_url: product.image_url,
          name: updateProductDto.name,
          price: Number(updateProductDto.price),
          type: updateProductDto.type,
          stock: Number(updateProductDto.stock),
        },
      });
      return productUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prisma.products.findUnique({
        where: {
          id: id,
          is_deleted: false,
        },
      });

      // Check if the product exists
      if (product == null) {
        throw new Error('Product not found');
      }

      // Delete image existing from vercel blob
      const getImageBlob = await head(product.image_url);

      // Check if the image not exists
      if (getImageBlob == null) {
        throw new Error('Image not found');
      }

      // Delete image existing from vercel blob
      await del(product.image_url);

      const productDeleted = await this.prisma.products.update({
        where: {
          id: id,
        },
        data: {
          is_deleted: true,
          image_url: null,
        },
      });

      return productDeleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
