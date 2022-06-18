import React,{useState} from 'react'
import axios from 'axios'

const Weather = () => {
  const [data,setData] = useState({});  
  const [location,setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=72b9a32b8d7f585a9c86b81f6f78f50a&units=metric`;
  
  const searchLocation = (e) =>{
        e.preventDefault();  
        axios.get(url)
        .then((response)=>{
            setData(response.data);
        })
        // console.log(data);
        setLocation('')
  }
  

  const dateBuilder = (d) =>{
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return (`${day}, ${date} ${month} ${year}`)
  }

  const display = () =>{
      if(Object.keys(data).length === 0){
             return('app')
      }
      else {
          // console.log("in else");
          if(data.length !== "undefined"){
              if(data.weather[0].main === "Clouds"){
                return('appClouds')
              } else if (data.weather[0].main === "Thunderstorm"){
                return('appThunder')
              } else if (data.weather[0].main === "Haze" || data.weather[0].main === "Smoke" || data.weather[0].main === "Fog"){
                return('appHaze')
              } else if (data.weather[0].main === "Clear"){
                return('appClear')
              } else if (data.weather[0].main === "Rain"){
                return('appRain')
              } else if (data.weather[0].main === "Snow"){
                return('appSnow')
              }  else if (data.weather[0].main === "Mist"){
                return('appMist')
              } else if (data.weather[0].main === "Dust" || data.weather[0].main === "Sand" || data.weather[0].main === "Ash"){
                return('appDust')
              } else if (data.weather[0].main === "Drizzle"){
                return('appDrizzle')
              } else if (data.weather[0].main === "Squall"){
                return('appSquall')
              } else if (data.weather[0].main === "Tornado"){
                return('appTornado')
              }               
          }
     }
     
  }

  const result = display()
  // console.log(data.length);
  // console.log(result);

  return (
    <div className={result}>

    <div className='main'>
        
            <div className='display relative'>
                <h2 className='mt-6 ml-12 text-xl bold'>Weather</h2>     

                {typeof data.main != "undefined" ? 
                ( <div className=' ml-12 absolute bottom-20 flex'>
                    <div className='temp '>
                        <h2 className='bold text-9xl pr-2'>{Math.round(data.main.temp)}°<span className='cel'>C</span></h2>
                    </div>

                    <div className='location mt-9 pl-1 '>
                    <span className='bold pl-1 date'>{dateBuilder(new Date)}</span><br/>
                        <span className='text-6xl'>{data.name}</span>
             
                    </div>
                    <div className=''>
                        <div className='description pl-6 relative'>
                            <span><img className='img' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt=""/></span> <br/>
                            <span className='absolute bold des '>{data.weather[0].main}</span>
                        </div>
                    </div>    
                </div>
                ) : ('')}
               
            </div>

            <div className='search w-1/3'>

                <div className='top relative'>
                <input className='' type="text" value={location} onChange={ e => setLocation(e.target.value) } placeholder="Enter Location" />
                <button className=' searchicon' onClick={(e)=>searchLocation(e)} >
                <svg className=" h-11 w-11 text-white relative left-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
                </div>
              
                <div className='bottom'>
                    <h3 className='bold text-2xl mb-5 '>Weather Details</h3>
                   <>   
                    <div className='feels mb-4 h-20 '>
                        <p>Feels like</p>
                      <p> {typeof data.main != "undefined" ? 
                      ( <span className='bold mb-4'>{Math.round(data.main.feels_like)}°C</span>) : ('')}</p> 
                    </div>
                    <div className='humidity mb-4 h-20 '>
                        <p>Humidity</p>         
                      <p> {typeof data.main != "undefined" ? 
                    ( <span className='bold'>{data.main.humidity} %</span>):('')}</p> 
                    </div>
                    <div className='wind mb-4 h-20 '>
                        <p>Wind speed</p>
                        {typeof data.main != "undefined" ? 
                    (<span className='bold text-xl'>{data.wind.speed.toFixed(1)} m/s</span>):('')}
                    </div>
                    <div className='wind mb-4 h-20 '>
                        <p>Pressure</p>
                        {typeof data.main != "undefined" ? 
                    (<span className='bold text-xl'>{data.main.pressure} hPa</span>):('')}
                    </div>
                    <div className='wind mb-4 h-20 '>
                        <p>Description</p>
                        {typeof data.main != "undefined" ? 
                    (<span className='bold text-xl'>{data.weather[0].description}</span>):('')}
                    </div>
                    </> 

            </div>
            </div>
    </div>


    </div>
  )
}

export default Weather