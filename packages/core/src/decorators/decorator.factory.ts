import {SuiteTarget} from "../suite-decorator.builder";
import {Suite} from "../models";

export type SuiteMethodDecorator = (target: Partial<SuiteTarget>, key: string) => void;

export class DecoratorFactory {
  static createSuiteDecorator(callback: (target: SuiteTarget, key: string) => void): SuiteMethodDecorator {
    return (target: Partial<SuiteTarget>, key: string) => {
      if (!target.suite) {
        target.suite = new Suite();
      }

      callback(target as SuiteTarget, key);
    }
  }
}
