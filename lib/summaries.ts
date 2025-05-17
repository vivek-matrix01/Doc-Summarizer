import { getDbConnection } from "./db";

export async function getSummaries({userId}:{userId:string}) {
  const sql = await getDbConnection();
  const summaries = await sql`SELECT * FROM pdf_summaries WHERE user_id=${userId}
    ORDER BY created_at DESC`;
  return summaries;
    
}
export async function getSummaryById(id:string) {
  try{
      const sql=await getDbConnection();
      const [summary]=await sql`SELECT * FROM pdf_summaries where id=${id}`;
      return summary;
  }
  catch(err){
      console.error("Cannot get Summary by ID",err);
      return null;
  
  }
       
  }

  export async function getUserUploadCount(userId:string){
    const sql=await getDbConnection();
    try{
      const [result] =await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id=${userId}`;
      return result.count||0;

    }
    catch(err){
      console.error('Error in geting upload count ');
      return 0;
    }
  }