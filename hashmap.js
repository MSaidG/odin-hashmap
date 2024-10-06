export class HashMap {

  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactor = loadFactor;
    this.map = new Array(initialCapacity);
  }


  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.capacity;
  }


  set(key, value) {
		// if (this.get(key) !== undefined) {
		// 	this.remove(key);
		// }

		if (this.size / this.capacity >= this.loadFactor) {
			this.resize();
		}

		const index = this.hash(key);
		if (this.map[index] === undefined) {
			this.map[index] = [{ key, value }];
			this.size++;
		} 

		const keyValueIndex = this.map[index].findIndex((kv) => kv.key === key);
		if (keyValueIndex !== -1) {
			this.map[index].splice(keyValueIndex, 1);
			this.size--;
		}
		this.map[index].push({ key, value });
		this.size++;
  }

  get(key) {
    const index = this.hash(key);
    if (this.map[index] === undefined) {
      return undefined;
    }
    const keyValue = this.map[index].find((kv) => kv.key === key);
    return keyValue ? keyValue.value : undefined;
  }

  remove(key) {
    const index = this.hash(key);
    if (this.map[index] === undefined) {
      return false;
    }
    const keyValueIndex = this.map[index].findIndex((kv) => kv.key === key);
    if (keyValueIndex === -1) {
      return false;
    }
    this.map[index].splice(keyValueIndex, 1);
    this.size--;
		console.log("REMOVED:  " + key);
    return true;
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newMap = new Array(newCapacity);
    for (let i = 0; i < this.capacity; i++) {
      if (this.map[i] !== undefined) {
        for (const kv of this.map[i]) {
          const newIndex = this.hash(kv.key) % newCapacity;
          if (newMap[newIndex] === undefined) {
            newMap[newIndex] = [];
          }
          newMap[newIndex].push(kv);
        }
      }
    }
    this.capacity = newCapacity;
    this.map = newMap;
  }

  has(key) {
    const index = this.hash(key);
    if (this.map[index] === undefined) {
      return false;
    }
    return this.map[index].some((kv) => kv.key === key);
  }

  getSize() {
    return this.size;
  }

  getCapacity() {
    return this.capacity;
  }

		length() {
		return this.map.length;
	}

	clear() {
		for (let i = 0; i < this.length(); i++) {
			this.map[i] = undefined;
		}
	}

	keys() {
		return Object.keys(this.map);
	}

	values() {
		return Object.values(this.map);
	}

	entries() {
		return Object.entries(this.map);
	}
}
