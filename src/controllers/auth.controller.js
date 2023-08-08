import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { database, development } from '../config/site.config.js';
import { AuthHelper } from '../utils/auth-helper.js';
class AuthController {
  async SIGN_UP(req, res) {
    try {
      const { filename } = req.file;

      const { first_name, last_name, email, password } = req.body;
      const { AccessToken, RefreshToken } = AuthHelper(email);

      const user = await User.create({
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync(password, 10),
        image: `http:${development['HOST']}:${development['PORT']}/api/media/${filename}`,
        image_filename: filename,
      });
      res.status(201).json({
        message: 'User was registered successfully!',
        tokens: { AccessToken, RefreshToken },
        data: user,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async SIGN_IN(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User Not found.' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            AccessToken: null,
            message: 'Invalid Password!',
          });
        }

        const { AccessToken, RefreshToken } = AuthHelper(email);

        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          tokens: { AccessToken, RefreshToken },
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
}

export default new AuthController();
