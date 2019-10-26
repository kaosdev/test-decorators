import {BeforeEach, Suite, SuiteDecorator, SuiteDecoratorBuilder, SuiteFactory, SuiteTarget,} from "../src";
import {FilteredKeys} from "../src/types";
import {SuiteTest} from "../src/models/suite";
import {It} from "../src/decorators/it.decorator";
import {BeforeAll} from "../src/decorators/before-all.decorator";
import {AfterEach} from "../src/decorators/after-each.decorator";
import {AfterAll} from "../src/decorators/after-all.decorator";
import {SuiteMethodDecorator} from "../src/decorators/decorator.factory";
import createSpy = jasmine.createSpy;

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
    const testSpy = createSpy();
    const [target] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
        @It() 'should execute'() {
          this.operation();
        }

        private operation() {
          return testSpy();
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

  async function testDecoratorOrderInSuite(key: FilteredKeys<Suite, Array<any>>, decoratorFn: () => SuiteMethodDecorator) {
    const [{suite}] = await buildDecorators((Suite: SuiteDecorator) => {
      @Suite()
      class SuiteTest {
        res: any;

        @decoratorFn() setup1() {
          this.res = 1;
        }

        @decoratorFn() setup2() {
          return this.res;
        }
      }
    });

    expect(suite[key].length).toBe(2);
    expect(suite[key][0].name).toBe('setup1');
    expect(suite[key][0].key).toBe('setup1');
    expect(suite[key][1].name).toBe('setup2');
    expect(suite[key][1].key).toBe('setup2');
  }

  function buildDecorators(callback: (Suite: SuiteDecorator) => void): Promise<SuiteTarget[]> {
    return new Promise<SuiteTarget[]>((resolve) => {
      const targets: SuiteTarget[] = [];

      const suiteFactory: SuiteFactory = {
        buildSuite: (target) => targets.push(target),
      };

      callback(new SuiteDecoratorBuilder(suiteFactory).build());

      resolve(targets);
    });
  }
});
