import dotenv from "dotenv";
import axios from "axios";
const url: string = "https://api.cotemig.com.br/v1/boletim";

dotenv.config();

const user: string = process.env.USER as string;
const password: string = process.env.PASSWORD as string;

axios
  .get(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${user}:${password}`).toString(
        "base64"
      )}`,
    },
  })
  .then((res) => {
    console.log(res.data);
  });
