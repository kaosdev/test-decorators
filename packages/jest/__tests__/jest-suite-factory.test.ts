import {JestSuiteFactory} from "../src";
import {
  AfterAll,
  AfterEach,
  BeforeAll,
  BeforeEach,
  It,
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

  function callDescribe(index = 0): void {
    (describe as any as jest.Mock).mock.calls[index][1]();
  }
});

