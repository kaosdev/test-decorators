import {SuiteFactory, SuiteTarget,} from '@test-decorators/core';

export class JestSuiteFactory extends SuiteFactory {
  buildSuite(target: SuiteTarget): void {
    const {suite} = target;
    describe(suite.name || '', () => {
      suite.beforeAllList.forEach(bfa => {
        beforeAll(target[bfa.key].bind(target))
      });

      suite.beforeEachList.forEach(bfe => {
        beforeEach(target[bfe.key].bind(target))
      });

      suite.tests.forEach(test => {
        it(test.name, target[test.key].bind(target));
      });
    });
  }
}
