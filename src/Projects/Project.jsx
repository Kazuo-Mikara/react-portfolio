
import ExecutiveOverview from '../assets/Executive_Overview.png'
import Travel from "../assets/image.png"
import './Project.css'
export const Project = () => {
  return (
    <>
    <div className="header">
        <h3>Projects</h3>
      </div>
    <section className="articles">
      
  <article>
    <div className="article-wrapper">
      <figure>
        <img src="https://picsum.photos/id/1011/800/450" alt="" />
      </figure>
      <div className="article-body">
        
        <h2>Pharmacy E-commerce</h2>
        <p>This is a freelance project wrote for a pharmacy company.I have provide the github link and the project is written in PHP.</p>
        <a href="https://github.com/Kazuo-Mikara/pharmacy_ecommerce" className="read-more">
          Read more <span className="sr-only">about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
  <article>

    <div className="article-wrapper">
      <figure>
        <img src={ExecutiveOverview} alt="" />
      </figure>
      <div className="article-body">
        <h2>Executive Overview</h2>
        <p>
         This aims to provide geographic visualization for profit ration by region in US.
         </p>
        <a href="https://public.tableau.com/app/profile/htoo.myat.kyaw/viz/ExecutiveOverview_16922934911770/ProfitRatiobyGeography" target='_blank' className="read-more">
          Read more <span className="sr-only">about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  </article>
  <article>

    <div className="article-wrapper">
      <figure>
      <img src={Travel} />
      </figure>
      <div className="article-body">
        <h2>YBS Transportation </h2>
        <p>
          For the people of Yangon, we are developing a transportation guided system that offers up-to-date bus route information and a routing engine to direct users from their current location to the nearest bus stop and then to their destination bus stop.
        </p>
        <a href="https://kazuo-travels.vercel.app/" target='_blank' className="read-more">
        </a>
      </div>
    </div>
  </article>
</section>
</>
  )
}
