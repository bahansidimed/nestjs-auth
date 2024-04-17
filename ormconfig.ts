import { Comment } from 'src/entities/comment.entity';
import { Topic } from 'src/entities/topic.entity';
import { User } from 'src/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';


const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'auth',
  entities: [User, Topic, Comment],
  synchronize: true,
};

export default config;
