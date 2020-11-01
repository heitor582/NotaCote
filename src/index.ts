import https from "https";
import dotenv from "dotenv";

const url: string = "https://api.cotemig.com.br/v1/boletim";

dotenv.config();

const user: string = process.env.USER as string;
const password: string = process.env.PASSWORD as string;

const options = {
  host: url,
  Authorization: `Basic ${Buffer.from(`${user}:${password}`).toString(
    "base64"
  )}`,
};

https
  .get(options, function (res) {
    res.setEncoding("utf8");
    res.on("data", function (data) {
      if (res.statusCode == 200) {
        const json = JSON.parse(data);
        console.log(json);
      } else {
        try {
          var json = JSON.parse(data);
          console.log("ERRO " + json.erro + ": " + json.detalhes);
        } catch (e) {
          console.log("ERRO 500: Erro interno do servidor.");
        }
      }
    });
  })
  .on("error", function (e) {
    console.error(e);
  })
  .end();
