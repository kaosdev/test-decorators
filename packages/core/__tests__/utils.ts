import {SuiteDecorator, SuiteDecoratorBuilder, SuiteFactory, SuiteTarget} from "../src/core";
import {FilteredKeys} from "../src/types";
import {Suite} from "../src/models";
import {SuiteMethodDecorator} from "../src/decorators/decorator.factory";

export async function testDecoratorOrderInSuite(key: FilteredKeys<Suite, Array<any>>, decoratorFn: () => SuiteMethodDecorator) {
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


export function buildDecorators(callback: (Suite: SuiteDecorator) => void): Promise<SuiteTarget[]> {
  return new Promise<SuiteTarget[]>((resolve) => {
    const targets: SuiteTarget[] = [];

    const suiteFactory: SuiteFactory = {
      buildSuite: (target) => targets.push(target),
    };

    callback(new SuiteDecoratorBuilder(suiteFactory).build());

    resolve(targets);
  });
}
