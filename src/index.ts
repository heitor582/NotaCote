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

      let disciplinas = res.data.etapas.map((v: any) => (
        v.disciplinas.sort((a: { id: number; }, b: { id: number; }) => {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        })
      ));
      let notas: any = [];
      for(let i: number = 0; i < disciplinas.length; i++){
        for(let j:number = 0; j < disciplinas[i]; j++){
          console.log(disciplinas[i][j]['avaliacoes'][4]['valor'])
          if(notas[j]['materia'] == disciplinas[i][j]['nome']){
            notas[j]['nota'] += disciplinas[i][j]['avaliacoes'][4]['valor']
          }else{
            notas.push({materia: disciplinas[i][j]['nome'], nota: disciplinas[i][j]['avaliacoes'][4]['valor']})
          }
        }
      }
      console.log(notas);
    } catch (err) {
      console.log(err);
    }
  }
}
new Main();
