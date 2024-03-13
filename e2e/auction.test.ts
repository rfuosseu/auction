import request from 'supertest';
import app from '../src/app';
import { usecases } from './usecases';

describe('Test endpoint POST /results', () => {
  test.concurrent.each(usecases)(
    'should response POST method ',
    async (input, winner, price) => {
      const response = await request(app)
        .post('/results')
        .send(input as any);
      expect(response.statusCode).toBe(200);
      expect(response.body.winner).toBe(winner);
      expect(response.body.price).toBe(price);
    }
  );
});
