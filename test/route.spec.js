const test = require('ava');
const Route = require('../src/route');
const sinon = require('sinon');

test('create get route without permissions should work', (t) => {
    const prepareRoute = {
        verb: 'get',
        action: () => true,
        level: undefined,
        path: '/test/',
        permissions: false,
        middlewares: undefined
    };
    const route = new Route(prepareRoute);
    const app = {
        get: sinon.spy()
    };
    route.create(app);
    t.is(app.get.calledOnceWith(prepareRoute.path, [], prepareRoute.action), true);
});

test('create get route with permissions should work', (t) => {
    const prepareRoute = {
        verb: 'get',
        action: () => true,
        level: 'public',
        path: '/test/',
        permissions: level => level,
        middlewares: undefined
    };
    const route = new Route(prepareRoute);
    const app = {
        get: sinon.spy()
    };
    route.create(app);
    t.is(app.get.calledOnceWith(
        prepareRoute.path,
        prepareRoute.permissions('public'),
        [],
        prepareRoute.action
    ), true);
});

test('desc should work', (t) => {
    const prepareRoute = {
        verb: 'get',
        action: () => true,
        level: 'public',
        path: '/test/',
        permissions: level => level,
        middlewares: undefined
    };
    const route = new Route(prepareRoute);
    const desc = route.desc();
    t.is(desc, '\tpublic\tget\t[/test/]');
});
