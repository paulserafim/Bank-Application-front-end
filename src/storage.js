export function read(property) {
  const json = window.localStorage.getItem(property);
  if (json !== null) return JSON.parse(json);
  //return json === null ? [] : JSON.parse(json);
}

export function write(elements, property) {
  const json = JSON.stringify(elements);
  window.localStorage.setItem(property, json);
  return elements;
}

export function appendToStorage(element, property) {
  const elements = read(property);
  elements.push(element);
  write(elements, property);
}

export function storeUserPosition(coordinates) {
  const json = JSON.stringify(coordinates);
  window.localStorage.setItem("geoposition", json);
}

export function readUserPosition() {
  const json = window.localStorage.getItem("geoposition");
  return json === null ? [] : JSON.parse(json);
}

export function remove(id) {
  const actions = read();
  const index = actions.findIndex((element) => element.id === id);
  if (index !== -1) {
    actions.splice(index, 1);
    write(actions);
  }
}

export function removeCredentials() {
  window.localStorage.removeItem("credentials");
}

export function removeAll() {
  window.localStorage.clear();
}
