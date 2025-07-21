//this is the principal interface of the iterator pattern
interface MyIterator<T> {
  current(): T; // 🔹 return actual element
  next(): T; // 🔹 return actual element and go to the next
  key(): number; // 🔹 actual index
  valid(): boolean; // 🔹 verification if the actual index is valid
  rewind(): void; // 🔹 reset to the first element
}

//interface aggregator for the iterator pattern
interface Aggregator {
    // is not necesary to return a string it could be any type example: User, Product, etc.
  getIterator(): MyIterator<string>;
}

//my collection that implements the aggregator interface
//this collection is only a simple example of a collection of words
//you can implement it with any type of data
class WordsCollection implements Aggregator {
    //static collection of words
  private items: string[] = [];

  //this method is used to add items to the collection
  addItem(item: string): void {
    this.items.push(item);
  }

  //this method is used to get the items of the collection
  getItems(): string[] {
    return this.items;
  }

  //this method is used to get the count of items in the collection
  getCount(): number {
    return this.items.length;
  }

  //this method is used to get the iterator of the collection
  getIterator(): MyIterator<string> {
    //"this" refers to the current instance of WordsCollection
    return new AlphabeticalOrderIterator(this);
  }

    //this method is used to get the reverse iterator of the collection
  getReverseIterator(): MyIterator<string> {
    //the true parameter indicates that the iterator will return the items in reverse order
    //"this" refers to the current instance of WordsCollection
    return new AlphabeticalOrderIterator(this, true);
  }
}

class AlphabeticalOrderIterator implements MyIterator<string> {
  private position: number = 0;
  private reverse: boolean = false;

  constructor(private collection: WordsCollection, reverse: boolean = false) {
    this.reverse = reverse;
    this.position = reverse ? collection.getCount() - 1 : 0;
  }

  rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  current(): string {
    return this.collection.getItems()[this.position];
  }

  next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  key(): number {
    return this.position;
  }

  valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }
    return this.position < this.collection.getCount();
  }
}

