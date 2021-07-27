import axios from "axios";

export async function deletarProduto(id){
    try{
       const response = await axios({
          method: 'delete',
          url: `http://localhost:8080/api/excluir/${id}`
       })

       console.log(response)
       if(response.status == 204){
          window.location.reload();
       }
    } catch(error){
       console.log(error);
    }
 }