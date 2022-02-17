import request from 'supertest';
import { app } from '../app';

describe('App', () => {
    // teste create user route
    it('should return 200 on create new user', async () => {
        const response = await request(app).post('/users').send({
            name: 'Nicolas',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        console.log(response.body);
        expect(response.statusCode).toBe(201);
    })
    it('should return 200 on list users', async () => {
        const response = await request(app).get('/users')

        expect(response.statusCode).toBe(200);
    })
    it('should be able to return 400 if user does exist in create user', async () => {
        await request(app).post('/users').send({
            name: 'Nicolas',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        const response = await request(app).post('/users').send({
            name: 'Nicolas',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        expect(response.statusCode).toBe(400);
    }
    )
    it('should be able to to return 200 if users update', async () => {
        await request(app).post('/users').send({
            name: 'Nicolas',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        const response = await request(app).put('/users/1').send({
            name: 'Nicolas Edited',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        expect(response.statusCode).toBe(200);
    })
    it('should be able to return 400 if user does not exist in update user', async () => {
        const response = await request(app).put('/users/465564546').send({
            name: 'Nicolas Edited',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        expect(response.statusCode).toBe(400);
    });
    it('should be able to to return 200 if users delete', async () => {
        await request(app).post('/users').send({
            name: 'Nicolas',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        const response = await request(app).delete('/users/1').send({
            name: 'Nicolas Edited',
            email: 'nicolasteofilodecastro@gmail.com',
        });

        expect(response.statusCode).toBe(204);
    })
    it('should be able to return 400 if user does not exist in delete user', async () => {
        const response = await request(app).delete('/users/465564546')

        expect(response.statusCode).toBe(400);
    });
});
