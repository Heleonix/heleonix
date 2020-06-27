export function isDomElementName(name) {
  if (!name) {
    return false;
  }

  const code = name.charCodeAt(0);

  return code >= 97 && code <= 122;
}
