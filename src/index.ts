import { notStrictEqual } from "assert";
import axios from "axios";
import dotenv from "dotenv";

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

      let disciplinasArray = res.data.etapas.map((v: any) => (
        v.disciplinas.sort((a: { id: number; }, b: { id: number; }) => {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        })
      ));
      
      let disciplinas:any = [];

      disciplinasArray.map((v:any)=>{
        v.map((j:any)=>{
          disciplinas.push(j);
        })
      })
      
      disciplinas = disciplinas.disciplinas.sort((a: { id: number; }, b: { id: number; }) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      })

      console.log(disciplinas);
    } catch (err) {
      console.log(err);
    }
  }
}
new Main();
