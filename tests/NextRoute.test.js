const NextUniversalRoute = require('../src/NextUniversalRoute');

test('should construct NextRoute', () => {
  const testRoute = new NextUniversalRoute('/', 'index');
  expect(testRoute).toBeDefined();
  expect(testRoute.path).toBe('/');
  expect(testRoute.page).toBe('/index');
});

test('should get path-to-regexp path', () => {
  const testRoute = new NextUniversalRoute('/test/:a', 'test');

  expect(testRoute.path).toBe('/test/:a');
});

test('should generate cloned object', () => {
  const testRoute = new NextUniversalRoute('/test/:a', 'test');
  const testRouteA = testRoute.generateUrl({ a: 'a' });
  const testRouteB = testRoute.generateUrl({ a: 'b' });
  const testRouteC = testRoute.generateUrl({ a: 'c' });

  expect(testRouteA).not.toBe(testRouteB);
  expect(testRouteA).not.toBe(testRouteC);
  expect(testRouteB).not.toBe(testRouteC);
});

test('should format params', () => {
  const testRoute = new NextUniversalRoute('/test/:a', 'test');
  const nextRoute = testRoute.generateUrl({ a: 'A' }, { id: 'ID' });

  expect(nextRoute.params).toMatchObject({ a: 'a' });
  expect(nextRoute.queryStringParams).toMatchObject({ id: 'id' });
});

test('should format params with custom function', () => {
  const formatter = string => string.toUpperCase();
  const testRoute = new NextUniversalRoute('/test/:a', 'test', formatter);
  const nextRoute = testRoute.generateUrl({ a: 'a' }, { id: 1 });

  expect(nextRoute.params).toMatchObject({ a: 'A' });
  expect(nextRoute.queryStringParams).toMatchObject({ id: 1 });
});

test('should generate proper as and href with params and qs', () => {
  const testRoute = new NextUniversalRoute('/test/:a', 'test');
  const nextRoute = testRoute.generateUrl({ a: 'A' }, { id: 'ID' });

  expect(nextRoute.toAs()).toBe('/test/a?id=id');
  expect(nextRoute.toHref()).toBe('/test?a=a&id=id');
});

test('should generate proper as and href without params and qs', () => {
  const testRoute = new NextUniversalRoute('/test', 'test');
  const nextRoute = testRoute.generateUrl();

  expect(nextRoute.toAs()).toBe('/test');
  expect(nextRoute.toHref()).toBe('/test');
});

test('should generate proper as and href with additional queryString params on page', () => {
  const testRoute = new NextUniversalRoute('/test', 'test?a=b');
  const nextRoute = testRoute.generateUrl();

  expect(nextRoute.toAs()).toBe('/test');
  expect(nextRoute.toHref()).toBe('/test?a=b');
});
