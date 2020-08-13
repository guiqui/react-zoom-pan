class Registry {
  constructor() {
    this.data = {};
  }
  addAll = (list) => {
    if (!list) return;
    this.data = {};
    list.forEach((element) => {
      this.data[element.id] = element;
    });
  };
  add(id, obj) {
    this.data[id] = obj;
  }
  del(id) {
    delete this.data[id];
  }
  get(id) {
    return this.data[id];
  }
  delAll() {
    this.data = {};
  }
}
const instanceRegistry = new Registry();
export default instanceRegistry;
