export class Suite {
  public tests: SuiteTest[] = [];
  public beforeEachList: SuiteBeforeEach[] = [];
  public beforeAllList: SuiteBeforeAll[] = [];
  public afterEachList: SuiteAfterEach[] = [];
  public afterAllList: SuiteAfterAll[] = [];
  public name: string | undefined;

  constructor() {
  }
}

export abstract class SuiteOperation {
  constructor(
    public name: string,
    public key: string,
    public params: any[] = [],
  ) {
  }

  execute(target: any): any {
    return target[this.key](...this.params);
  }
}

export class SuiteTest extends SuiteOperation {
}

export class SuiteBeforeEach extends SuiteOperation {
}

export class SuiteBeforeAll extends SuiteOperation {
}

export class SuiteAfterEach extends SuiteOperation {
}

export class SuiteAfterAll extends SuiteOperation {
}

