import { HeleonixError } from './HeleonixError';

export class InvalidInjectableMemberError extends HeleonixError {
  constructor(memberName) {
    super('The member "{0}" must be a non-static field without an initializer.', memberName);

    this.memberName = memberName;
  }
}
