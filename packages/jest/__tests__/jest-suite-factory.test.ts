import {JestSuiteFactory} from "../src";
import {
  AfterAll,
  AfterEach,
  BeforeAll,
  BeforeEach,
  It,
  Parametrized,
  SuiteDecorator,
  SuiteDecoratorBuilder
} from "@test-decorators/core";

describe('Jest Suite Factory', () => {
  let factory: JestSuiteFactory;
  let Jest: SuiteDecorator;

  beforeAll(() => {
    factory = new JestSuiteFactory();
    Jest = new SuiteDecoratorBuilder(factory).build();
  });

  beforeEach(() => {
    (global as any).describe = jest.fn();
    (global as any).beforeEach = jest.fn();
    (global as any).beforeAll = jest.fn();
    (global as any).afterEach = jest.fn();
    (global as any).afterAll = jest.fn();
    (global as any).it = jest.fn();
  });

  it('should create a describe', () => {
    @Jest()
    class MyTest {
    }

    expect(describe).toHaveBeenCalledWith('MyTest', expect.any(Function));
  });

  it('should create a test inside describe', () => {
    @Jest()
    class MyTest {
      @It() 'should exist'() {
      }
    }

    callDescribe();

    expect(it).toHaveBeenCalledTimes(1);
    expect(it).toHaveBeenCalledWith('should exist', expect.any(Function));
  });

  it('should create a before each inside describe', () => {
    @Jest()
    class MyTest {
      @BeforeEach() setup() {
      }
    }

    callDescribe();

    expect(beforeEach).toHaveBeenCalledTimes(1);
    expect(beforeEach).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should create a before all inside describe', () => {
    @Jest()
    class MyTest {
      @BeforeAll() setup() {
      }
    }

    callDescribe();

    expect(beforeAll).toHaveBeenCalledTimes(1);
    expect(beforeAll).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should create an after each inside describe', () => {
    @Jest()
    class MyTest {
      @AfterEach() setup() {
      }
    }

    callDescribe();

    expect(afterEach).toHaveBeenCalledTimes(1);
    expect(afterEach).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should create an after all inside describe', () => {
    @Jest()
    class MyTest {
      @AfterAll() setup() {
      }
    }

    callDescribe();

    expect(afterAll).toHaveBeenCalledTimes(1);
    expect(afterAll).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should bind it function to target', () => {
    @Jest()
    class MyTest {
      prop = true;

      @It() setup() {
        return this.prop;
      }
    }

    callDescribe();

    expectFunctionReturnValue(it).toBeTruthy();
  });

  it('should bind before each function to target', () => {
    @Jest()
    class MyTest {
      prop = true;

      @BeforeEach() setup() {
        return this.prop;
      }
    }

    callDescribe();

    expectFunctionReturnValue(beforeEach).toBeTruthy();
  });

  it('should bind before all function to target', () => {
    @Jest()
    class MyTest {
      prop = true;

      @BeforeAll() setup() {
        return this.prop;
      }
    }

    callDescribe();

    expectFunctionReturnValue(beforeAll).toBeTruthy();
  });

  it('should bind after each function to target', () => {
    @Jest()
    class MyTest {
      prop = true;

      @AfterEach() setup() {
        return this.prop;
      }
    }

    callDescribe();

    expectFunctionReturnValue(afterEach).toBeTruthy();
  });

  it('should bind after all function to target', () => {
    @Jest()
    class MyTest {
      prop = true;

      @AfterAll() setup() {
        return this.prop;
      }
    }

    callDescribe();

    expectFunctionReturnValue(afterAll).toBeTruthy();
  });

  it('should pass parameter to parametrized tests', () => {
    @Jest()
    class MyTest {
      @Parametrized({source: [1, 2]}) test(param: number) {
        return param;
      }
    }

    callDescribe();

    expectFunctionReturnValue(it, 0).toBe(1);
    expectFunctionReturnValue(it, 1).toBe(2);
  });

  function callDescribe(index = 0): void {
    (describe as any as jest.Mock).mock.calls[index][1]();
  }

  function expectFunctionReturnValue(mock: any, index = 0) {
    const fn: Function = (mock as jest.Mock).mock.calls[index]
      .find((f: any) => typeof f === 'function');
    return expect(fn());
  }
});

