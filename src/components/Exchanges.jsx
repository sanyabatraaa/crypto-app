import React, { useEffect,useState } from 'react'
import  Header from './Header.jsx' 
import axios from 'axios'
import { Baseurl } from './baseUrl.js'
import Loader from './Loader.js'
import './Exchanges.css'
import OurModel from './OurModel.jsx'
const Exchanges = () => {
    const [loading,setLoading]=useState(true)
    const [exchanges,setExchanges]=useState([])
    useEffect(()=>{
        const getExchangeData=async()=>{
            try {
                const { data } = await axios.get(`${Baseurl}/exchanges`);
                console.log(data);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exchange data:', error);
                setLoading(false); // Set loading to false even on error
            }
        }
        getExchangeData()
    },[])
  return (
    
    loading ? <Loader/>:<>
    <Header/>
    <OurModel/>
    <div>
  {exchanges.map((item, i) => (
    <div key={i} className="ex-card-link" onClick={() => window.open(item.url, "_blank")}>
      <div className="ex-cards">
        <div className="image">
          <img height={"80px"} src={item.image} alt={item.name} />
        </div>
       
          <div className="name">{item.name}</div>
          <div className="price">{item.trade_volume_24h_btc.toFixed(0)}</div>
          <div className="rank">{item.trust_score_rank}</div>
        
      </div>
    </div>
  ))}
</div>
    </>
  )
}

export default Exchanges
