type HttpCode = 400 | 404 | 500;

export class BadRequest extends Error {
  constructor (public message: string, public status: HttpCode = 500) {
    super(message);
    this.name = 'Bad Request';
  }
}