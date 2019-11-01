import {Suite} from "./suite";
import {AfterAll, AfterEach, BeforeAll, BeforeEach, Parametrized} from "@test-decorators/core";

@Suite()
class MySuite {
  order = 0;

  @BeforeAll() beforeAll() {
    expect(this.order).toBe(0);
    this.order++;
  }

  @BeforeEach() beforeEach() {
    expect([1, 2, 3, 4]).toContain(this.order);
    this.order++;
  }

  @Parametrized({
    source: [0, 2, 4, 6],
    name: (data, index) => `${index}. should pass with ${data}`
  }) 'should pass'(arg: number) {
    expect(arg % 2).toBe(0);
  }

  @AfterEach() afterEach() {
    expect([2, 3, 4, 5]).toContain(this.order);
  }

  @AfterAll() afterAll() {
    expect(this.order).toBe(6);
  }
}

