import { ProductoPago } from './productoPago';
export interface PaymentIntentDto {
    //token: string;
    description: string;
    amount: number;
    currency: string;
    listArticulos:Array<ProductoPago>;
}


