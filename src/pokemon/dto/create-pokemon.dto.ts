import { IsEnum, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @MinLength(3)
  name: string;

  @IsEnum(['grass', 'water'], { message: 'Invalid type' })
  type: 'grass' | 'water';
}
