import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { TrainerGuard } from 'src/trainer/trainer.guard';

@Controller('pokemon')
@UseGuards(TrainerGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  // GET /pokemon?type=grass --> []
  @Get()
  getPokemon(@Query('type') type: 'grass' | 'water') {
    return this.pokemonService.getPokemon(type);
  }
  @Get(':id')
  getOnePokemon(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.pokemonService.getOnePokemon(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Post()
  createPokemon(
    @Body(new ValidationPipe()) CreatePokemonDto: CreatePokemonDto,
  ) {
    return this.pokemonService.createPokemon(CreatePokemonDto);
  }
  @Put(':id')
  updatePokemon(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.updatePokemon(id, UpdatePokemonDto);
  }
  @Delete(':id')
  deletePokemon(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.removePokemon(id);
  }
}
