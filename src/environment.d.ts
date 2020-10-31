declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USER: number;
      PASSWORD: string
    }
  }
}
export {};
