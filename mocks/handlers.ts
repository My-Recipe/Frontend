import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/bookmark', () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
