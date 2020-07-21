import { Hidden } from '../Hidden';

export function setMemberKind(component, member, kind) {
  const cmpnt = component;

  if (!component.constructor.prototype[Hidden.memberKinds]) {
    cmpnt.constructor.prototype[Hidden.memberKinds] = {};
  }

  if (!component.constructor.prototype[Hidden.memberKinds][member]) {
    cmpnt.constructor.prototype[Hidden.memberKinds][member] = kind;
  }
}
