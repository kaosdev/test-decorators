import {SuiteTest} from "../models/suite";
import {SuiteTarget} from "../suite-decorator.builder";
import {DecoratorFactory} from "./decorator.factory";

export function It() {
  return DecoratorFactory.createSuiteDecorator(
    (target: SuiteTarget, key: string) => {
      target.suite.tests = [
        ...target.suite.tests,
        new SuiteTest(key, key),
      ];
    }
  );
}
