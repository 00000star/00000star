declare module "paynow" {
  export class Paynow {
    constructor(
      integrationId: string,
      integrationKey: string,
      resultUrl: string,
      returnUrl: string
    );
    integrationId: string;
    integrationKey: string;
    resultUrl: string;
    returnUrl: string;
    isValidEmail(emailAddress: string): boolean;
    createPayment(reference: string, authEmail: string): Payment;
    sendMobile(
      payment: Payment,
      phone: string,
      method: string
    ): Promise<InitResponse | undefined>;
  }

  export class Payment {
    add(title: string, amount: number, quantity?: number): Payment;
  }

  export class InitResponse {
    success: boolean;
    error?: string;
    pollUrl?: string;
    instructions?: string;
    redirectUrl?: string;
    isInnbucks?: boolean;
    innbucks_info?: Array<Record<string, string>>;
  }
}
