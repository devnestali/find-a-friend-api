import { UniqueEntityId } from "./unique-entity-id.js";

export abstract class Entity<T> {
  private _id: UniqueEntityId;
  protected props: T;

  constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId();
  }
}
