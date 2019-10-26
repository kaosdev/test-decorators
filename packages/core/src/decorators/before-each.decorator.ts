import {SuiteBeforeEach} from "../models/suite";
import {SuiteTarget} from "../suite-decorator.builder";
import {DecoratorFactory} from "./decorator.factory";

export function BeforeEach() {
  return DecoratorFactory.createSuiteDecorator(
    (target: SuiteTarget, key: string) => {
      target.suite.beforeEachList = [
        ...target.suite.beforeEachList,
        new SuiteBeforeEach(key, key),
      ];
    }
  );
}
