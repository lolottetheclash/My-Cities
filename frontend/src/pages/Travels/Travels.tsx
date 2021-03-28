import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/index';

const Travels = observer(
  (): JSX.Element => {
    const { travelsStore } = useStores();

    return (
      <>
        <h1>Travels Page !!!!</h1>
        {travelsStore.isLoading && <h1>Loading Travels...</h1>}
        <ul>
          {travelsStore.travels.map((travel) => (
            <>
              <li key={1}>{travel.city}</li>
            </>
          ))}
        </ul>
      </>
    );
  }
);

export default Travels;
