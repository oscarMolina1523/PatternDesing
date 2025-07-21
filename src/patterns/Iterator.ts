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
export class WordsCollection implements Aggregator {
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

//this is the iterator that implements the MyIterator interface
//this iterator will return the items of the collection in alphabetical order
class AlphabeticalOrderIterator implements MyIterator<string> {
    //this is the position of the iterator by defect is 0
  private position: number = 0;
  //this is the reverse flag to indicate if the iterator will return the items in reverse order
  //by defect is false
  private reverse: boolean = false;

  //constructor receives the collection and a boolean to indicate if the iterator
  //  will return the items in reverse order by defect is false
  constructor(private collection: WordsCollection, reverse: boolean = false) {
    this.reverse = reverse;
    //if the reverse is true, the position will be the last item of the collection
    //if the reverse is false, the position will be the first item of the collection
    this.position = reverse ? collection.getCount() - 1 : 0;
  }

  //this method is used to reset the iterator to the first item of the collection
  //now is not necessary but if you want to use the iterator again
  //you can call this method to reset the position whitout creating a new instance
  rewind() {
    this.position = this.reverse ? this.collection.getCount() - 1 : 0;
  }

  //this method returns the current item of the collection
  current(): string {
    return this.collection.getItems()[this.position];
  }

  //this method returns the next item of the collection and moves the position
  next(): string {
    const item = this.collection.getItems()[this.position];
    // if the reverse is true, the position will be decremented
    // if the reverse is false, the position will be incremented
    //similar to have --> this.position = this.position + (this.reverse ? -1 : 1);
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  //this method returns the actual index of the iterator
  key(): number {
    return this.position;
  }

  //this method verifies if the actual index is valid
  valid(): boolean {
    if (this.reverse) {
        // if the reverse is true, the position must be greater than or equal to 0
      return this.position >= 0;
    }
    // if the reverse is false, the position must be less than the count of items
    return this.position < this.collection.getCount();
  }
}

