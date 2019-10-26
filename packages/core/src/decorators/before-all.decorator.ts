import {SuiteBeforeAll} from "../models/suite";
import {SuiteTarget} from "../suite-decorator.builder";
import {DecoratorFactory} from "./decorator.factory";

export function BeforeAll() {
  return DecoratorFactory.createSuiteDecorator(
    (target: SuiteTarget, key: string) => {
      target.suite.beforeAllList = [
        ...target.suite.beforeAllList,
        new SuiteBeforeAll(key, key),
      ];
    }
  );
}
