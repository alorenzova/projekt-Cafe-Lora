import { render } from '@czechitas/render';
import '../global.css';
import './index.css';

import { Banner } from '../components/Banner/banner';
import { Contact } from '../components/Contact/contact';
import { Footer } from '../components/Footer/footer';
import { Gallery } from '../components/Gallery/gallery';
import { Header } from '../components/Header/header';
import { Menu } from '../components/Menu/menu';


const response = await fetch('http://localhost:4000/api/drinks');
const json = await response.json();
const drinks = json.data;
console.log(drinks);
console.log(drinks[0]);

/* 2 Komponenty
Chceme dosáhnout toho, aby kód pro obsah hlavní stránky aplikace v index.jsx vypadal takto:

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header />
    <main>
      <Banner />
      <Menu />
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </div>
);
*/

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <Header showMenu={true} />
    <main>
      <Banner />
      <Menu drinks={drinks}/>
      <Gallery />
      <Contact />      
    </main> 
    <Footer />
  </div>
);

/*
3 Zprovoznění navigace
Rozchoďte navigaci, aby fungovala i na úzkých displejích.
*/

const navBtn = document.querySelector(".nav-btn")
const rolloutNav = document.querySelector(".rollout-nav")

navBtn.addEventListener("click", () => {
  rolloutNav.classList.toggle("nav-closed")
})


rolloutNav.addEventListener("click", () => {
  rolloutNav.classList.add("nav-closed")
})

const handleOrder = async (event) => {
  event.preventDefault();
  const btnId = Number(event.target.dataset.id); 
  console.log(btnId);
  console.log(event.target.dataset)

// Bonus:
  const actualOrder = drinks.find((drink) => drink.id === btnId);
  console.log(actualOrder.ordered);
  const changeOrderStatusTo = actualOrder.ordered ? false : true

const response = await fetch(`http://localhost:4000/api/drinks/${btnId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify( [{ op: 'replace', path: '/ordered', value: changeOrderStatusTo }]),
  })

if (!response.ok) {
  alert("Jejda, něco se pokazilo...");
} else {
  console.log(`Dobrá zpráva, změna objednávky ${btnId} se podařila!`)
  window.location.reload();
}}

const drinkControls = document.querySelectorAll(".drink__controls")
drinkControls.forEach( (btn) => {
  btn.addEventListener('submit', handleOrder)
});



/* 2 Komponenty
Rozsekejte hlavní stránku na komponenty.

Složka components a v ní komponenty pro hlavní stránku (JSX i CSS tak, aby každá komponenta měla vlastní styly i obrázky). 
Globální styly v souboru global.css beze změny. 

Styly komponent hlavní stránky v index.css. Soubor je strukturovaný tak, aby styly pro jednotlivé komponenty byly seskupené u sebe, 
nemusíte tak zoufale lovit styly po celém projektu. 

V souboru order.css jsou styly pro detail objednávky - ty zatím neřešte, detailem se budete zabývat až v druhé části projektu.
*/

// druhý projekt k API 
// zkontrolovat, že je všude opravdeno na locahost:4000 !!!
// npx apidroid@latest