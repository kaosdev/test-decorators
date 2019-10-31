import {SuiteDecorator} from "../src";
import {AfterAll, AfterEach, BeforeAll, BeforeEach, It,} from "../src/decorators";
import {buildDecorators, testDecoratorOrderInSuite} from "./utils";

describe('Test Decorators', () => {

  it('should add tests', async () => {
    const [{suite}] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
        res = true;

        @It() test1() {
          return this.res;
        }

        @It() test2() {
          return this.res;
        }
      }
    });

    expect(suite.tests.length).toBe(2);
    expect(suite.tests[0].name).toBe('test1');
    expect(suite.tests[0].key).toBe('test1');
    expect(suite.tests[1].name).toBe('test2');
    expect(suite.tests[1].key).toBe('test2');
  });

  it('should ignore other functions', async () => {
    const [{suite}] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
        @It()
        'should execute'() {
          this.operation();
        }

        private operation() {
        }
      }
    });


    expect(suite.tests.length).toBe(1);
    expect(suite.tests[0].name).toBe('should execute');
  });

  it('should call the test function on target', async () => {
    const testSpy = jest.fn();
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
        @It() 'should execute'() {
          this.operation();
        }

        private operation() {
          testSpy();
        }
      }
    });

    target[target.suite.tests[0].key]();

    expect(testSpy).toHaveBeenCalled();
  });

  it('should add before each in order', async () => {
    await testDecoratorOrderInSuite('beforeEachList', BeforeEach);
  });

  it('should add beforeAll in order', async () => {
    await testDecoratorOrderInSuite('beforeAllList', BeforeAll);
  });

  it('should add afterEach in order', async () => {
    await testDecoratorOrderInSuite('afterEachList', AfterEach);
  });

  it('should add afterAll in order', async () => {
    await testDecoratorOrderInSuite('afterAllList', AfterAll);
  });

});
