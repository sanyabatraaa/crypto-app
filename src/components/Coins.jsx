import React from 'react'
import {useState,useEffect} from 'react'
import { Baseurl } from './baseUrl'
import Loader from './Loader'
import axios from 'axios'
import Header from './Header'
import {Link} from 'react-router-dom'
const Coins = () => {
    const [loading,setLoading]=useState(true)
    const [coins,setCoins]=useState([])
    const [currency,setCurrency]=useState('inr')
    const [search,setSearch]=useState('')
    const currencySymbol=currency==='inr' ?'₹' : '$'
    useEffect(() => {
        const getCoinsData = async () => {
            try {
                const { data } = await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`);
                console.log(data);
                setCoins(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };
        getCoinsData();
    }, [currency]);
    
  return (
    loading ? <Loader/>:<>
    <Header/>
    <div className="search-bar">
      <input type="text" placeholder="Search"
      style={{height:"2rem",width:"20rem",position:"absolute",top:"1%",left:"35%"}}
      onChange={(e)=>setSearch(e.target.value)}
      ></input>
    </div>
    <div className="btns">
        <button onClick={()=>setCurrency('inr')}>INR</button>
        <button onClick={()=>setCurrency('usd')}>USD</button>
    </div>
    <div>
  {
  coins.filter((data)=>{
    if(data=='')
      return data
    else if(data.name.toLowerCase().includes(search.toLowerCase())){
      return data
    }
  }).map((item, i) => {
    return(
        <CoinCard item={item} key={i} currencySymbol={currencySymbol}/>
    )

  }
      
  )}
</div>
    </>
    
  )
}
const CoinCard=({item,currencySymbol})=>{
    const profit=item.price_change_percentage_24h>0
    return(
        <Link to={`/coins/${item.id}`} style={{textDecoration:"none"}}>
            <div className="ex-cards" >
        <div className="image">
          <img height={"80px"} src={item.image} alt={item.name} />
        </div>
          <div className="name">{item.name}</div>
          <div className="price">{currencySymbol}{item.current_price.toFixed(0)}</div>
          <div className="profit" style={profit?{color:"green"}:{color:"red"}}>{profit?'+'+ item.price_change_percentage_24h.toFixed(2):item.price_change_percentage_24h.toFixed(2)}</div>
      </div>
        </Link>
    )
}

export default Coins
