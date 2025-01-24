export interface Producto {
    id?: number;
    nombre: string;
    descripcion?: string;
    precio?: number;
    precioFinal?: number;
    imagen?: string;
    sku:string;
    promocion:boolean;
    descuento: number;
    categoria:string;
    stock: number;
}
