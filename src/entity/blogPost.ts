import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Category, PostCategories } from ".";
import { User } from "./user";

@Entity('BlogPosts')
export class BlogPost {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column('varchar', {
    nullable: false,
  })
  title!: string;

  @Column('varchar', {
    nullable: false,
  })
  content!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column('int', {
    nullable: true,
  })
  userId!: number;

  @Column('datetime', {
    nullable: true,
  })
  published!: Date;

  @Column('datetime', {
    nullable: true,
  })
  updated!: Date;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'PostsCategories',
    joinColumn: { name: 'postId' },
    inverseJoinColumn: { name: 'categoryId' },
  })
  categories!: Category[];
}
