import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  private pokemons = [
    { id: 1, name: 'Bulbasaur', type: 'grass' },
    { id: 2, name: 'squirtle', type: 'water' },
  ];

  getPokemon(type?: 'grass' | 'water') {
    if (type) {
      return this.pokemons.filter((pokemon) => pokemon.type === type);
    }
    return this.pokemons;
  }

  getOnePokemon(id: number) {
    const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new Error('Pokemon not found');
    }

    return pokemon;
  }

  createPokemon(CreatePokemonDto: CreatePokemonDto) {
    const newPokemon = {
      ...CreatePokemonDto,
      id: Date.now(),
    };
    this.pokemons.push(newPokemon);

    return newPokemon;
  }

  updatePokemon(id: number, UpdatePokemonDto: UpdatePokemonDto) {
    this.pokemons = this.pokemons.map((pokemon) => {
      if (pokemon.id === id) {
        return { ...pokemon, ...UpdatePokemonDto };
      }
      return pokemon;
    });

    return this.getOnePokemon(id);
  }

  removePokemon(id: number) {
    const toBeRemoved = this.getOnePokemon(id);

    this.pokemons = this.pokemons.filter((pokemon) => pokemon.id !== id);

    return toBeRemoved;
  }
}
