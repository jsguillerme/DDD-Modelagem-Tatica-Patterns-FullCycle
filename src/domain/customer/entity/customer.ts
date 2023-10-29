import Address from "../object-values/address";

export default class Customer {

  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  get name() {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id(): string {
    return this._id;
  }

  get Address(): Address {
    return this._address;
  }

  changeName(name: string) {
    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  validate() {
    if(this._id.length < 1) {
      throw new Error("Id cannot be empty");
    }

    if (this._name.length < 1) {
      throw new Error("Name cannot be empty");
    }
  }

  activate() {

    if (this._address === undefined || this._address === null) throw new Error("Address cannot be empty");
    
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive() {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}