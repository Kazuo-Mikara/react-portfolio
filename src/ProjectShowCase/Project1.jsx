import './Project1.css'
import ExecutiveOverview from '../assets/Executive_Overview.png'
import Travel from "../assets/image.png"
export default function Project1(){
    return (

        
<div className="wrapper">
  <div className="card"><img src="https://images.unsplash.com/photo-1477666250292-1419fac4c25c?auto=format&amp;fit=crop&amp;w=667&amp;q=80&amp;ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"/>
    <div className="info">
      <h1>pharmacy <br /> e-commerce</h1>
      <p>this is a freelance project wrote for a pharmacy company.I have provide the github link and the project is written in PHP.</p>
      <a className='nav_link' target='_blank' href='https://github.com/Kazuo-Mikara/pharmacy_ecommerce'>learn more</a>
    </div>
  </div>
  <div className="card"><img src={ExecutiveOverview}/>
    <div className="info">
      <h1>Road</h1>
      <p>This aims to provide geographic visualization for profit ration by region in US.</p>
      <a className='nav_link' target="_blank" href='https://public.tableau.com/app/profile/htoo.myat.kyaw/viz/ExecutiveOverview_16922934911770/ProfitRatiobyGeography'>learn more</a>
    </div>
  </div>
  <div className="card"><img src={Travel}/>
    <div className="info">
      <h1>kazuo travels</h1>
      <p> For the people of Yangon, we are developing a transportation guided system that offers up-to-date bus route information and a routing engine to direct users from their current location to the nearest bus stop and then to their destination bus stop.
        </p>
      <a className='nav_link' target='_blank' href='https://kazuo-travels.vercel.app/'>learn more</a>
    </div>
  </div>
</div>
    )

}