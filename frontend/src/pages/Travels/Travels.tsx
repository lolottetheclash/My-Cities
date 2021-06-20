import { observer } from 'mobx-react-lite';
import { useStores } from '../../stores/index';

const Travels = observer(
  (): JSX.Element => {
    const { travelStore, userStore } = useStores();

    return (
      <>
        <h1>Travels Page !!!!</h1>
        {travelStore.isLoading && <h1>Loading Travels...</h1>}
        <ul>
          {travelStore.travels.map((travel) => (
            <>
              <li key={travel.title}>{travel.city}</li>
            </>
          ))}
        </ul>
      </>
    );
  }
);

export default Travels;
