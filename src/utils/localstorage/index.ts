export default {
  getValue(key: string) {
    const value = localStorage.getItem(key) ?? '""';
    return JSON.parse(value);
  },
  setValue(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
