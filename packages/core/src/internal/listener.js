export function listener(definition) {
  const def = definition;
  const { value } = def.descriptor;

  def.descriptor = {};
  def.kind = 'field';
  def.placement = 'own';

  def.initializer = function initializer() {
    const self = this;

    const boundListener = function boundListener(args) {
      value.call(self, ...args);
    };

    return boundListener;
  };

  return def;
}
