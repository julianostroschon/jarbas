enum AllowedMethods {
  POST = 'POST',
  GET = 'GET',
}


export function validateRequest(request: Request): void {
  validateMethod(request)
  validateOrigin(request)
  if (request.headers.get('x-github-event') === null) {
    throw new Error('Missing event header');
  }
}

function validateMethod(request: Request): void {
  const methods = Object.values(AllowedMethods)
  if (!methods.includes(request.method as AllowedMethods)) {
    throw new Error('Method not allowed');
  }
}

function validateOrigin(request: Request): void {
  const origin = request.headers.get('origin');
  if (origin === null) {
    throw new Error('Missing origin header');
  }

  if (origin !== 'http://localhost:3000') {
  // if (origin !== 'https://api.github.com') {
    throw new Error('Invalid origin header');
  }
}