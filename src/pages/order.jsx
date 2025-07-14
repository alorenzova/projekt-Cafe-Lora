import { render } from '@czechitas/render';
import '../global.css';
import './index.css';
import './order.css';
import { Header } from '../components/Header/header';
import { Order } from '../components/Order/order';
import { Footer } from '../components/Footer/footer';

// API
const response = await fetch('http://localhost:4000/api/drinks?filter=ordered:eq:true&select=id,name,image');
const json = await response.json();
const orderData = json.data;
console.log(orderData);

document.querySelector('#root').innerHTML = render(
  <div className="page">
    <div className="page">
      <Header showMenu={false} />
      <Order items={orderData} />
      <Footer />
    </div>
  </div>
);


/* 2
3 Stránka pro detail objednávky
Oživte stránku pro zobrazení detailu objednávky.
*/