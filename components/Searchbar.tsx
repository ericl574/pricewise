"use client"

import {FormEvent, useState} from "react"
import {scrapeAndStoreProduct} from "@/lib/actions"
const isValidAmazonProductURL = (url:string) =>{
  try{
    const parsedURL = new URL (url);
    const hostname= parsedURL.hostname
    if(hostname.includes('amazon.com')||
       hostname.includes('amazon.co.uk')|| 
       hostname.endsWith('amazon')||
      hostname.includes("amazon.ca"))  
       {
        return true;
       }
  }
  catch(error){
    return false;

  }
  return false;

}

const Searchbar = () => {
  const [searchPrompt,setSearchPrompt]=useState('');
  const [isLoading, setIsLoading]=useState(false);
    
  const handleSubmit= async (event:FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidLink = isValidAmazonProductURL(searchPrompt)

      if (!isValidLink) return alert ('Please provide a valid Amazon link')

      try{
          setIsLoading(true);
        

          const product =await scrapeAndStoreProduct(searchPrompt);
      }
      
      catch{
        console.log(error)

      }finally{
        setIsLoading(false)
      }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' 
          onSubmit={handleSubmit}>

        <input 
        type="text"
        value ={searchPrompt}
        onChange={(e)=> setSearchPrompt(e.target.value)}
        placeholder='Enter Product link'
        className="searchbar-inpout"/>

        <button 
        type="submit" 
        className="searchbar-btn" 
        disabled={searchPrompt===''}>
          {isLoading ? "Searching...": "Search"}
            Search
        </button> 
    </form>
  )
}

export default Searchbar