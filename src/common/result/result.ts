export class Result<T> {
    // Constructor toma tres parámetros:
    // isSuccess: boolean - indica si el resultado es exitoso o no
    // value?: T - si el resultado es exitoso, el valor que devolverá (opcional)
    // error?: string - si el resultado es fallido, el error que devolverá (opcional)
    constructor(public isSuccess: boolean, public readonly value?: T ,public error?: string) {}

    static success<U>(value: U): Result<U> {
        return new Result<U>(true, value, undefined);
    }

    static failure<U>(error: string): Result<U> {
        return new Result<U>(false, undefined, error);
    }

}
