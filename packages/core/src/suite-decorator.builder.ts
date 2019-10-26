import {Constructor} from "./types";
import {SuiteFactory} from "./factories/suite.factory";
import {Suite} from "./models";

export type SuiteDecorator = (name?: string) => ClassDecorator;

export interface SuiteTarget {
  suite: Suite;

  [key: string]: any;
}

export class SuiteDecoratorBuilder {
  constructor(
    private readonly suiteFactory: SuiteFactory,
  ) {
  }

  build(): SuiteDecorator {
    return (name?: string) => {
      return ((Target: Constructor<[], SuiteTarget>) => this.buildSuite(name, Target)) as ClassDecorator
    };
  }

  private buildSuite(name: string | undefined, Target: Constructor<[], SuiteTarget>) {
    const target = new Target();

    if (!target.suite) {
      target.suite = new Suite();
    }

    target.suite.name = name || Target.name;
    this.suiteFactory.buildSuite(target);
  }
}
