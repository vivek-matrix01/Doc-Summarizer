'use server'
import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export async function deleteSummaryAction(id:string) {
    try {
      const sql = await getDbConnection();
      const user=await auth();
      const userId = user.userId;
      if (!userId) {
        throw new Error("User not found");
      }
    const result = await sql`DELETE FROM pdf_summaries WHERE id = ${id} AND user_id = ${userId}
    RETURNING id` ;
    if (result.length > 0) {
    revalidatePath('/dashboard');
    return { success: true };
    }
    return { success: false}

}
catch (error) {
    console.error("Error deleting summary:", error);
    return { success: false };
  }
    
}