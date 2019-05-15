export default function(object, ...methods) {
  methods.forEach(methodName => {
    object[methodName] = object[methodName].bind(object);
  })
}