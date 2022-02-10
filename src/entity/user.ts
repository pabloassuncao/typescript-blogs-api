import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { BlogPost } from "./blogPost";

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn("increment")
  @OneToMany(() => (BlogPost),
   (blogPost) => (blogPost.userId))
  id!: number;

  @Column('varchar', {
    nullable: false,
  })
  displayName!: string;

  @Column('varchar', {
    nullable: false,
  })
  email!: string;

  @Column('varchar', {
    nullable: false,
  })
  password!: string;

  @Column('varchar', {
    nullable: true,
  })
  image!: string;
}
