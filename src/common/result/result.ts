// Para crear la clase result utilizamos un generic <T>
export class Result<T> {
    // constructor tomando tres parametros 
    // isSuccess: boolean --> indica si el resultado es exitoso o no
    // value?: T --> si el resultado es exitoso, el valor que devolvera | opcional
    // error?: string --> si el resultado es fallido, el error que devolvera | opcional 
    constructor(public isSuccess: boolean, public readonly value?: T ,public error?: string) {}

    static succes<U>(value: U): Result<U> {
        return new Result<U>(true, value, undefined);
    }

    static failure<U>(error: string): Result<U> {
        return new Result<U>(false, undefined, error);
    }

}