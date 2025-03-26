import { describe, it, expect } from 'vitest';
import store from '../index.js';

interface RatingsResult {
  ratings: number;
  histogram: Record<string, number>;
}

const id = '553834731';

describe('Ratings method', () => {
  it('should fetch valid ratings data by id', async () => {
    const ratings = (await store.ratings({ id })) as RatingsResult;
    expect(ratings).toBeTypeOf('object');
    expect(ratings.ratings).toBeDefined(); // May be 0 if unable to parse
    expect(ratings.histogram).toBeTypeOf('object');

    // Histogram values might be zero if the structure changed
    expect(ratings.histogram['1']).toBeDefined();
    expect(ratings.histogram['2']).toBeDefined();
    expect(ratings.histogram['3']).toBeDefined();
    expect(ratings.histogram['4']).toBeDefined();
    expect(ratings.histogram['5']).toBeDefined();
  });

  it('should fetch valid ratings data by id and country', async () => {
    const ratingsForUs = (await store.ratings({ id })) as RatingsResult;
    expect(ratingsForUs).toBeTypeOf('object');
    expect(ratingsForUs.ratings).toBeDefined();
    expect(ratingsForUs.histogram).toBeTypeOf('object');

    const ratingsForFr = (await store.ratings({ id, country: 'fr' })) as RatingsResult;
    expect(ratingsForFr).toBeTypeOf('object');
    expect(ratingsForFr.ratings).toBeDefined();
    expect(ratingsForFr.histogram).toBeTypeOf('object');
  });
});
