export class Helpers {
    public static isUndefined(o: unknown) {
        if (o === undefined) {
            return true;
        }
        if (o === null) {
            return true;
        }
        return false;
    }
}