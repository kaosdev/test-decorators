import {DecoratorFactory} from "./decorator.factory";
import {SuiteAfterEach} from "../models/suite";

export function AfterEach() {
  return DecoratorFactory.createSuiteDecorator(
    (target, key) => {
      target.suite.afterEachList = [
        ...target.suite.afterEachList,
        new SuiteAfterEach(key, key)
      ]
    }
  );
}
