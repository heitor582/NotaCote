import axios from "axios";
import dotenv from "dotenv";

const url: string = "http://api.cotemig.com.br/v1/boletim";

dotenv.config();

const user: string = process.env.USER as string;
const password: string = process.env.PASSWORD as string;

class Main {
  constructor() {
    this.pegarNota();
  }
  async pegarNota() {
    try{
      const data = await axios.get(url, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${user}:${password}`).toString(
            "base64"
          )}`,
        },
      });
      console.log(data.data)
    }catch(err){
      console.log(err);
    }
  }
}
new Main();