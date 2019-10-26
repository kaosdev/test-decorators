import {DecoratorFactory} from "./decorator.factory";
import {SuiteAfterAll} from "../models/suite";

export function AfterAll() {
  return DecoratorFactory.createSuiteDecorator(
    (target, key) => {
      target.suite.afterAllList = [
        ...target.suite.afterAllList,
        new SuiteAfterAll(key, key),
      ]
    }
  );
}
