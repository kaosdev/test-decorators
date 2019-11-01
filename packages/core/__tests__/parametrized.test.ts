import {buildDecorators} from "./utils";
import {SuiteDecorator} from "../src/core";
import {Parametrized} from "../src/decorators/parametrized.decorator";

describe('@Parametrized', () => {
  test('should create a test with source parameter', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class MyTest {
        @Parametrized({
          source: [1]
        }) 'test'(param: number) {
          return param;
        }
      }
    });

    const test = target.suite.tests[0];
    expect(target[test.key](test.params)).toEqual(1);
  });

  test('should create a test with source parameter array', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class MyTest {
        @Parametrized({
          source: [
            [1, 'hello']
          ]
        }) 'test'([number, string]: [number, string]) {
          return [string, number];
        }
      }
    });

    const test = target.suite.tests[0];
    expect(target[test.key](test.params)).toEqual(['hello', 1]);
  });

  test('should create tests based on source parameters', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class MyTest {
        @Parametrized({
          source: [1, 2, 3]
        }) 'test'(param: number) {
          return param;
        }
      }
    });

    const [test1, test2, test3] = target.suite.tests;
    expect(target[test1.key](test1.params)).toEqual(1);
    expect(target[test2.key](test2.params)).toEqual(2);
    expect(target[test3.key](test3.params)).toEqual(3);
  });

  test('should set tests name based on iteration', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class MyTest {
        @Parametrized({
          source: [1, 2, 3]
        }) 'test'(param: number) {
          return param;
        }
      }
    });

    const [test1, test2, test3] = target.suite.tests;
    expect(test1.name).toEqual('(1) test');
    expect(test2.name).toEqual('(2) test');
    expect(test3.name).toEqual('(3) test');
  });

  test('should set tests name based on custom function', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class MyTest {
        @Parametrized({
          source: [1, 2, 3],
          name: (data, index) => `${index}. testSomething(${data})`
        }) 'test'(param: number) {
          return param;
        }
      }
    });

    const [test1, test2, test3] = target.suite.tests;
    expect(test1.name).toEqual('0. testSomething(1)');
    expect(test2.name).toEqual('1. testSomething(2)');
    expect(test3.name).toEqual('2. testSomething(3)');
  });
});
