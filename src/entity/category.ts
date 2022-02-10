import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { BlogPost, PostCategories } from ".";

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column('varchar', {
    nullable: false,
  })
  name!: string;
}
