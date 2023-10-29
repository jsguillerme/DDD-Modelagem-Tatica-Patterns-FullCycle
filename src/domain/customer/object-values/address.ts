export default class Address {
  _street: string = "";
  _number: number = 0;
  _city: string = "";
  _zip: string = "";

  constructor(street: string, number: number, city: string, zip: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;

    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get city() {
    return this._city;
  }

  get zip() {
    return this._zip;
  }

  validate() {
    if (this._street.length < 1) {
      throw new Error("Street cannot be empty");
    }
    if (this._number < 1) {
      throw new Error("Number cannot be less than 1");
    }
    if (this._city.length < 1) {
      throw new Error("City cannot be empty");
    }
    if (this._zip.length < 1) {
      throw new Error("Zip cannot be empty");
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city} - ${this._zip}`;
  }
}