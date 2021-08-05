import { EntityIdentifier } from "./entitityidentifier";

export interface Repository<T> {
    find(id: EntityIdentifier): T;
    findAll(): T[];
    save(entity: T): void;
}