import {SuiteFactory, SuiteTarget} from '@test-decorators/core';


export class JestSuiteFactory extends SuiteFactory {
  buildSuite(target: SuiteTarget): void {
    const {suite} = target;
    describe(suite.name || '', () => {
      suite.beforeAllList.forEach(({key}) => {
        beforeAll(() => this.getTargetFunction(target, key)());
      });

      suite.beforeEachList.forEach(({key}) => {
        beforeEach(() => this.getTargetFunction(target, key)());
      });

      suite.tests.forEach(({name, key, params}) => {
        it(name, () => this.getTargetFunction(target, key)(params));
      });

      suite.afterEachList.forEach(({key}) => {
        afterEach(() => this.getTargetFunction(target, key)());
      });

      suite.afterAllList.forEach(({key}) => {
        afterAll(() => this.getTargetFunction(target, key)());
      });
    });
  }

  private getTargetFunction(target: SuiteTarget, key: string): (...args: any) => void {
    return target[key].bind(target);
  }
}
