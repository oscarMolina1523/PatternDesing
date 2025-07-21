//this is the principal interface of the iterator pattern
interface Iterator<T> {
  current(): T; // 🔹 return actual element
  next(): T; // 🔹 return actual element and go to the next
  key(): number; // 🔹 actual index
  valid(): boolean; // 🔹 verification if the actual index is valid
  rewind(): void; // 🔹 reset to the first element
}
