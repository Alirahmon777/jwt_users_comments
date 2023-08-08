import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { development } from './config/site.config.js';
import { testDbConnection } from './db/db.js';
import { authRoutes, commentRoutes, userRoutes } from './routes/index.js';
import { User } from './models/User.js';
import { Comment } from './models/Comment.js';
const START_APP = async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use('/api/media', express.static(development['PUBLIC']));
    app.use('/api/auth', authRoutes);
    app.use('/api', userRoutes);
    app.use('/api', commentRoutes);

    await User.sync();
    User.hasMany(Comment, {
      foreignKey: 'user_id',
    });
    console.log('User Model synced');

    await Comment.sync();
    Comment.belongsTo(User, {
      foreignKey: 'id',
    });
    console.log('Comment Model synced');

    app.listen(development['PORT'], development['HOST'], () =>
      console.log(
        `Server is running on http://${development['HOST']}:${development['PORT']}`,
      ),
    );
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

testDbConnection();
START_APP();
