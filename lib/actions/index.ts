"use server"
import { scrapAmazonProduct } from "../scraper";
import {connectToDB} from "../scraper/mongoose";
export async function scrapeAndStoreProduct(productUrl:string){
    if(!productUrl)return;
    try{
        connectToDB()
        const scrapedProduct=await scrapAmazonProduct(productUrl);
        if(!scrapedProduct)return;


    }catch(error:any){
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}