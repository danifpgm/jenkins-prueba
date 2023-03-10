import { CriptosSeed } from "../interfaces/criptosSeed.interface";

interface DatosSeed {
    criptos: CriptosSeed[];
}

export const DatosIniciales: DatosSeed = {
    criptos: [
        {
            nombre: "cripto1",
            precio: 50
        },
        {
            nombre: "cripto2",
            precio: 4000000
        },
        {
            nombre: "cripto3",
            precio: 20000
        },
        {
            nombre: "cripto4",
            precio: 1
        }
    ]
}