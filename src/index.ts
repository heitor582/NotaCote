import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

class Main {
  url: string = "https://api.cotemig.com.br/v1/boletim";
  user: string = process.env.USERNAME as string;
  password: string = process.env.PASSWORD as string;
  constructor() {
    this.pegarNota();
  }
  async pegarNota() {
    try {
      const res = await axios.get(this.url, {
        auth: {
          username: this.user,
          password: this.password,
        },
      });

      let disciplinas = res.data.etapas.map((v: any) => {
        v.disciplinas.sort((a: { id: number; }, b: { id: number; }) => {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        });
      });

      fs.writeFileSync("../notas.txt", JSON.parse(disciplinas));
      fs.open('../notas.txt','w', (err,file)=>{
        if (err) throw err;
        console.log('Abriu');
      })
    } catch (err) {
      console.log(err);
    }
  }
}
new Main();
