import {DecoratorFactory} from "./decorator.factory";
import {SuiteTarget} from "../core";
import {SuiteTest} from "../models/suite";

export interface ParametrizedConfig<T> {
  source: T[];
  name?: (data: T, index: number, key: string) => string;
}

export function Parametrized<T>(config: ParametrizedConfig<T>) {
  const nameFn = config.name || ((data, index, key) => `(${index + 1}) ${key}`);
  return DecoratorFactory.createSuiteDecorator(
    (target: SuiteTarget, key: string) => {
      target.suite.tests = [
        ...target.suite.tests,
        ...config.source.map((params, index) =>
          new SuiteTest(nameFn(params, index, key), key, params)),
      ];
    }
  );
}
