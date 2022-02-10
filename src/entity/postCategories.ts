import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BlogPost } from "./blogPost";
import { Category } from "./category";

@Entity('PostsCategories')
export class PostCategories {
  @PrimaryColumn()
  @ManyToOne(() => Category, category => category.id)
  categoryId!: number;

  @PrimaryColumn()
  @ManyToOne(() => BlogPost, blogPost => blogPost.id)
  postId!: number;
}
