import {SuiteDecoratorBuilder} from "@test-decorators/core";
import {JestSuiteFactory} from "@test-decorators/jest";

export const Suite = new SuiteDecoratorBuilder(
  new JestSuiteFactory()
).build();
