import express from 'express';

const app = express();

app.use(express.json());

interface User {
  name: string,
  email: string,
}

const users = []

function userExists(email: string): boolean {
  const user = users.some(user => user.email === email);
  return user;
}

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  const userExistsBoolean = userExists(email);

  if (userExistsBoolean) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const user = {
    name,
    email,
    id: users.length + 1
  };

  users.push(user);
  return res.status(201).json(user);
})

app.get('/users', (req, res) => {
  return res.status(200).json(users);
})

app.put('/users/:id', (req, res) => {
  const { id } = req.params;

  const { email, name } = req.body;

  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  users[id] = {
    ...user,
    email,
    name,
  }

  return res.status(200).json(users[id]);
})

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find(user => user.id === Number(id));

  if (!user) {
    return res.status(400).json({ error: 'User does not exists' })
  }

  users.splice(user, 1);

  return res.status(204).send();
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})

export { app };