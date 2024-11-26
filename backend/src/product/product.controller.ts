import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseDto } from '../helper/response.dto';

import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, File } from 'multer';
import { extname } from 'path';
import { JwtGuard } from '../auth/guard';
export const runtime = 'edge';
import * as multer from 'multer';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image_file', {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image_file: File,
  ) {
    try {
      // Check if file is null
      if (!image_file) {
        throw new Error('No file uploaded');
      }
      createProductDto.image_file = image_file;

      const newProduct = await this.productService.create(createProductDto);
      return new ResponseDto(
        'success',
        'Berhasil menambahkan product baru!',
        newProduct,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    try {
      const products = await this.productService.findAll();
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan semua products!',
        products,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(+id);
      return new ResponseDto(
        'success',
        'Berhasil mendapatkan product!',
        product,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image_file', {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image_file: File,
  ) {
    try {
      // Check if file is null
      if (!image_file) {
        updateProductDto.image_file = null;
      } else {
        updateProductDto.image_file = image_file;
      }

      const productUpdated = await this.productService.update(
        +id,
        updateProductDto,
      );

      return new ResponseDto(
        'success',
        'Product updated successfully',
        productUpdated,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const productDeleted = await this.productService.remove(+id);
      return new ResponseDto(
        'success',
        'Product deleted successfully',
        productDeleted,
      );
    } catch (error) {
      throw new HttpException(
        new ResponseDto('failed', error.message, null),
        HttpStatus.BAD_REQUEST, // Set status code 400
      );
    }
  }
}
