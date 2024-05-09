import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/Cities.context";
export default function CityList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((el) => (
        <CityItem key={el.id} city={el} />
      ))}
    </ul>
  );
}
