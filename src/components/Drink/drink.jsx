import { Layer } from '../Layer/layer';
import './drink.css';

export const Drink = ({id, name, image, ordered, layers}) => {
    return (     
        <div className="drink">
            <div className="drink__product">
                <div className="drink__cup">
                    <img src= {image} />
                </div>
                <div className="drink__info">
                    <h3> {name}</h3>
                    {layers.map((layer) => (
                        < Layer 
                            key={layer.label}
                            color = {layer.color}
                            label = {layer.label}
                        />
                      ))
                    }
                </div>
            </div>
            <form className="drink__controls" data-id={id}>
                <input type="hidden" className="order-id" value="0" />                  

                <button className={`order-btn ${ordered ? "order-btn--ordered" : " "}`}>
                    {ordered ? 'Zrušit' : 'Objednat'}                     
                </button>
            </form>
        </div>
    )
}


/*
4 Nápoj jako komponenta
Vytvořte komponentu pro zobrazení jednoho nápoje.

<Drink
  id={0}
  name="Romano"
  ordered={false}
  image="http://localhost:4000/assets/cups/romano.png"
  layers={[
    {
      color: '#fbdf5b',
      label: 'citrón',
    },
    {
      color: '#613916',
      label: 'espresso',
    },
  ]}
/>

<Layer color="#feeeca" label="mléčná pěna" />

*/