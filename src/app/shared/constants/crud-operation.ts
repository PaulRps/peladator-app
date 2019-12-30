export class CrudOperations {
    public static CREATE = 'create';
    public static UPDATE = 'update';
    public static DELETE = 'delete';

    public static isEqual(a, b): boolean {
        return a && b && a === b;
    }
}