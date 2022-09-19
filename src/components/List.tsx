import ListItem from "./ListItem";

export interface Radio {
  changeuuid: string;
  name: string;
  url: string;
}

type listPropsType = {
  list: Array<Radio>;
  init: boolean;
};

export default function List({ list, init }: listPropsType) {
  return (
    <section aria-label="section-radio-list">
      {init ? (
        <ul aria-label="radio-list-empty"></ul>
      ) : list.length > 0 ? (
        <ul aria-label="radio-list">
          {list.map((radio: Radio) => (
            <ListItem key={radio.changeuuid} radio={radio} />
          ))}
        </ul>
      ) : (
        <p aria-label="non-exist-answer">
          "No se han encontrado emisoras para esta búsqueda"
        </p>
      )}
    </section>
  );
}
