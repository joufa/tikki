
export class EntityIdentifier implements Equitable<EntityIdentifier>{
    private id: number|string;
    public constructor(id: number|string) {
        this.id = id;
    }

    print(): string {
        return `EntityIdentifier is ${this.id}`
    }
    
    isEqualTo(e: EntityIdentifier): boolean {
        return e.id === this.id;
    }
}

export abstract class EntityBase implements Entity {
    id: EntityIdentifier;
    constructor(id: EntityIdentifier) {
        this.id = id;
    };
};

export interface Entity {
    id: EntityIdentifier;
}

export interface Equitable<T> {
    isEqualTo(other: T): boolean;
}