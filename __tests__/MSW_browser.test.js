/**
 * @jest-environment ./__tests__/support/browser-environment.js
 */

describe('Service Worker', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle0' });
  });

  afterAll(async () => {});

  describe('Rest', () => {
    test('get works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('https://api.github.com/repos/jihchi/bs-msw');
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({ status: 200, body: 'jihchi/bs-msw' });
    });

    test('post works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('https://api.github.com/repos/jihchi/bs-msw', {
          method: 'POST',
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({ status: 200, body: 'jihchi/bs-msw' });
    });

    test('put works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('https://api.github.com/repos/jihchi/bs-msw', {
          method: 'PUT',
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({ status: 200, body: 'jihchi/bs-msw' });
    });

    test('patch works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('https://api.github.com/repos/jihchi/bs-msw', {
          method: 'PATCH',
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({ status: 200, body: 'jihchi/bs-msw' });
    });

    test('delete works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('https://api.github.com/repos/jihchi/bs-msw', {
          method: 'DELETE',
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({ status: 200, body: 'jihchi/bs-msw' });
    });

    test('options works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('https://api.github.com/repos/jihchi/bs-msw', {
          method: 'DELETE',
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({ status: 200, body: 'jihchi/bs-msw' });
    });
  });

  describe('GraphQL', () => {
    test('query works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('http://localhost:8080/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query GetUserDetail {
                user {
                  name
                }
              }`,
            variables: {
              name: 'jihchi/bs-msw',
            },
          }),
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({
        status: 200,
        body: '{"data":{"name":"jihchi/bs-msw"}}',
      });
    });

    test('query error works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('http://localhost:8080/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query GetUserDetailError {
                user {
                  name
                }
              }`,
            variables: {
              name: 'jihchi/bs-msw',
            },
          }),
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({
        status: 200,
        body:
          '{"errors":[{"message":"This is a mocked error: jihchi/bs-msw","locations":[{"line":1,"column":2}]}]}',
      });
    });

    test('mutation works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('http://localhost:8080/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation Logout {
                logout {
                  session
                }
              }`,
            variables: {
              referrer: 'jihchi/bs-msw',
            },
          }),
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({
        status: 200,
        body: '{"data":{"referrer":"jihchi/bs-msw"}}',
      });
    });

    test('mutation error works', async () => {
      const actual = await page.evaluate(async () => {
        const res = await fetch('http://localhost:8080/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation LogoutError {
                logout {
                  session
                }
              }`,
            variables: {
              referrer: 'jihchi/bs-msw',
            },
          }),
        });
        const body = await res.text();
        return { status: res.status, body };
      });

      expect(actual).toEqual({
        status: 200,
        body:
          '{"errors":[{"message":"This is a mocked error: jihchi/bs-msw","locations":[{"line":1,"column":2}]}]}',
      });
    });
  });
});
