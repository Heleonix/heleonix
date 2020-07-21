import { Symbols } from '../Symbols';
import { isPrimitive } from './isPrimitive';

const ERROR_NOT_IMPLEMENTED = 'Not implemented. You must provide implementation.';

const ERROR_DECORATOR_APPLICABLE_TO_EMPTY_FIELD_ONLY = 'The given decorator can be applied to an empty field only.';
const ERROR_DECORATOR_APPLICABLE_TO_INITIALIZED_FIELD_ONLY =
  'The given decorator can be applied to an initialized field only.';
const ERROR_DECORATOR_APPLICABLE_TO_INITIALIZED_FIELD_OR_GETTER_ONLY =
  'The given decorator can be applied to an initialized field or getter only.';
const ERROR_DECORATOR_APPLICABLE_TO_METHOD_ONLY = 'The given decorator can be applied to a method only.';

const ERROR_DECORATOR_USAGE_IS_WRONG = 'The decorator "{0}" cannot be used in the "{1}".';
const ERROR_COMPONENT_NOT_REGISTERED = 'A component with the key {0} not registered';
const ERROR_VALUE_NOT_PROVIDED = 'The "{0}" was not provided (got null, undefined, etc.).';
const ERROR_HANDLER_NOT_PROVIDED = 'Only a handler method, marked with @handler can be provided.';
const ERROR_TYPE_NOT_SUPPORTED = 'The type "{0}" is not supported to be observable.';
const ERROR_ONLY_PRIMITIVE_CAN_BE_SET = 'Only a primitive value can be set.';
const ERROR_INVALID_VIEW_ITEMS_TYPE = 'A view {0} can have only an array of items or a string but received: {1}.';
const ERROR_INVALID_VIEW_PROPS_TYPE = 'A view {0} can have only an array of props but received: {1}.';
const ERROR_COMPONENT_MEMBER_IS_NOT_RECOGNIZED = 'A component {0} has unrecognized kind of member {1}.';

export function validateViewUsage(usage) {
  if (usage.items) {
    if (!Array.isArray(usage.items)) {
      throw error(ERROR_INVALID_VIEW_ITEMS_TYPE, usage.name, usage.items);
    }
  }

  if (usage.props) {
    if (!Array.isArray(usage.props)) {
      throw error(ERROR_INVALID_VIEW_PROPS_TYPE, usage.name, usage.props);
    }
  }
}

export function validateIsHandler(handler) {
  if (handler?.[Hidden.isHandler] !== true) {
    throw error(ERROR_HANDLER_NOT_PROVIDED);
  }
}

export function validateViewDefinition(definition) {
  if (!usage) {
  }
}

export function validateValueProvided(value, name) {
  if (!value) {
    throw error(ERROR_VALUE_NOT_PROVIDED, name);
  }
}

export function validateNotImplemented() {
  throw error(ERROR_NOT_IMPLEMENTED);
}

export function validateComponentRegistered(component, name) {
  if (!component) {
    throw error(ERROR_COMPONENT_NOT_REGISTERED, name);
  }
}

export function validateCanRunApplication(componentsCache, root, entry) {
  validateValueProvided(componentsCache, 'components');

  validateValueProvided(root, 'root');

  validateValueProvided(entry, 'entry');
}

export function validateIsPrimitive(value) {
  if (!isPrimitive(value)) {
    throw error(ERROR_ONLY_PRIMITIVE_CAN_BE_SET);
  }
}

export function validateCanBeObservable(value) {
  if (value === null) {
    throw error(ERROR_TYPE_NOT_SUPPORTED, 'null');
  }

  if (value === undefined) {
    throw error(ERROR_TYPE_NOT_SUPPORTED, 'undefined');
  }

  if (typeof value === 'function') {
    throw error(ERROR_TYPE_NOT_SUPPORTED, 'function');
  }

  if (value.constructor.name !== 'Object') {
    throw error(ERROR_TYPE_NOT_SUPPORTED, value.constructor.name);
  }
}

export function validateComponentStructure(component) {
  /* eslint-disable no-restricted-syntax */
  /* eslint-disable guard-for-in */
  for (const key in component) {
    if (component[Hidden.memberKinds][key] === undefined) {
      throw error(ERROR_COMPONENT_MEMBER_IS_NOT_RECOGNIZED, component.constructor.name, key);
    }
  }
  /* eslint-enable no-restricted-syntax */
  /* eslint-enable guard-for-in */
}
