import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class Main {
  url: string = "http://api.cotemig.com.br/v1/boletim";
  user: string = process.env.USER as string;
  password: string = process.env.PASSWORD as string;
  constructor() {
    this.pegarNota();
  }
  async pegarNota() {
    try {
      const data = await axios.get(this.url, {
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.user}:${this.password}`).toString(
            "base64"
          )}`,
        },
      });
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  }
}
new Main();
