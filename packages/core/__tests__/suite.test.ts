import {SuiteDecorator} from "../src/core";
import {Suite} from "../src/models";
import {buildDecorators} from "./utils";

describe('Test Decorators', () => {

  it('should create a suite', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
      }
    });

    const {suite} = target;

    expect(suite).toEqual(expect.any(Suite));
  });

  it('should set suite name as class name', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
      }
    });

    const {suite} = target;

    expect(suite.name).toBe('SuiteTest');
  });

  it('should set suite name as custom name', async () => {
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite('Suite Test')
      class SuiteTest {
      }
    });

    const {suite} = target;

    expect(suite.name).toBe('Suite Test');
  });

  it('should setup multiple suites', async () => {
    const [target1, target2] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest1 {
      }

      @Suite()
      class SuiteTest2 {
      }
    });

    expect(target1.suite.name).toBe('SuiteTest1');
    expect(target2.suite.name).toBe('SuiteTest2');
  });
});
