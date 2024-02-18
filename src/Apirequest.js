const Apirequest= async(url="",optionobject=null)=>
{
    try{
    const response=await fetch(url,optionobject);
    if(!response.ok) throw Error
    }
    catch(err)
    {
        console.log(err.Message)

    }
    

}
export default Apirequest