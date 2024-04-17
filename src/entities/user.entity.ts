import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Comment } from './comment.entity';
import { Role } from 'src/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User }) // Add roles property
  roles: Role[]; // Array of roles

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  async hashPasword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
