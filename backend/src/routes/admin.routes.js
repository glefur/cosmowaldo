import express from 'express';
import userService from '../services/user.service.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: 'Provide a password' });
  }
  try {
    const token = userService.createAdmin(password);
    if (token !== null) {
      res.status(200).send(token);
    } else {
      res.status(400).send({ message: 'Invalide password'});
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

export default router;
