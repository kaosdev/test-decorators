import {SuiteTarget} from "../suite-decorator.builder";

export abstract class SuiteFactory {
  abstract buildSuite(suite: SuiteTarget): void;
}
