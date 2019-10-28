<p>
  <a href="https://badge.fury.io/js/%40test-decorators%2Fcore"><img src="https://badge.fury.io/js/%40test-decorators%2Fcore.svg" alt="npm version"></a>
</p>

# Test Decorators
> Typescript decorators for developing framework agnostic tests

## Table of Contents

- [Getting Started](#getting-started)
- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Installing

To work with decorators you need to install the core package and a framework adapter package.
```
npm install @test-decorators/core
npm install @test-decorators/<framework-name> # for 
```

### Example Usage (with jest)

First build your suite decorator, using SuiteDecoratorBuilder
```typescript
import {SuiteDecoratorBuilder} from '@test-decorators/core';
import {JestSuiteFactory} from '@test-decorators/jest';

export const Suite = new SuiteDecoratorBuilder(
    new JestSuiteFactory()
).build();
```

Then use it to build your test suites
```typescript
@Suite()
class MyTestSuite {
    testProp = false;
    
    @BeforeEach() setup() {
      this.testProp = true;
    }
   
    @It() 'should test'() {
      expect(this.testProp).toBeTruthy();
    }
}
```

### Framework Adapters

The following adapters are available.
- [Jest](packages/jest/README.md) <a href="https://badge.fury.io/js/%40test-decorators%2Fjest"><img src="https://badge.fury.io/js/%40test-decorators%2Fjest.svg" alt="npm version"></a>

### Build your own adapters
You can extend SuiteFactory to build your own adapters, and provide them to SuiteDecoratorBuilder
```typescript
export class JestSuiteFactory extends SuiteFactory {
  buildSuite(target: SuiteTarget): void {
    const {suite} = target;
    // build your suite with a framework
    describe(suite.name, () =>; ...)
  }
}

```

## [Contributing](CONTRIBUTING.md)

- Read our [code of conduct](CODE_OF_CONDUCT.md)
- Read our [contributing guide](CONTRIBUTING.md)

Any contribution following the above guidelines is really appreciated.

## License

test-decorators is [MIT licensed](LICENSE).
