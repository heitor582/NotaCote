import dotenv from 'dotenv';
import axios from 'axios';
const url: string = 'https://api.cotemig.com.br/v1/boletim';

dotenv.config();

const user: number = process.env.USER as number
const password: string = process.env.PASSWORD as string
axios.get(url,{
  headers: {
    auth: `${user}:${password}`
  }
 }).then(res =>{
  console.log(res)
}).catch(err=>{
  console.log(err)
});