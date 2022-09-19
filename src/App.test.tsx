import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./components/Search";
import App from "./App";
import { server } from "../src/components/test/mocks/server";

describe('El nombre de la aplicación debe mostrarse en algún lugar => "RADIO FACTORIA"', () => {

  test('El nombre de la aplicación debe mostrarse en algún lugar => "RADIO FACTORIA"', () => {
    render(<App />);

    // const titleElement = screen.getByText("RADIO FACTORIA");
    const titleElement = screen.getByRole('heading', { name: 'RADIO FACTORIA' })
    expect(titleElement).toBeInTheDocument();
  });
})
describe('Debemos poder buscar radios por nombre', () => {
  test('La aplicación debe tener un campo input con el placeholder => "Escribe el nombre de la radio"', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText("Escribe el nombre de la radio");
    expect(inputElement).toBeInTheDocument();
  })
  test('La aplicación debe tener un botón de búsqueda => Texto "Buscar"', () => {
    render(<App />);
    const buttonElement = screen.getByRole('button', { name: "Buscar" });
    expect(buttonElement).toBeInTheDocument();
  })
  test('Cuando hacemos clic en el botón buscar, se debe ejecutar la función de búsqueda una sola vez', () => {
    //Arrange (Preparación del test)
    const handleClickMock = jest.fn();
    const handleChangeMock = jest.fn();
    render(<Search value = ''
                   handleClick={handleClickMock}
                   handleChange={handleChangeMock} />);
    const buttonElement = screen.getByRole('button', { name: 'Buscar' });
    // buttonElement.addEventListener('click',handleClickMock);
    //Acción
    userEvent.click(buttonElement);
    //Assert
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  })
})
describe('Listado de emisoras', () => {
  beforeAll(() => server.listen())
  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  afterEach(() => server.resetHandlers())
  // Clean up after the tests are finished.
  afterAll(() => server.close())
  test('Debe existir un listado de emisoras', () => {
    render(<App />);
    // const listElement = screen.getByRole('list');
    const listElement = screen.getByLabelText('radio-list-empty');
    expect(listElement).toBeInTheDocument();
  })
  test('El listado debe inicializar vacío', () => {
    render(<App />);
    const listElement = screen.getByLabelText('radio-list-empty');
    expect(listElement.childElementCount).toBeLessThanOrEqual(0);
  })
  test('Cuando se hace una búsqueda válida, el listado debe mostrar al menos un resultado', async () => {
    //escribir un término de búsqueda
    render(<App />);
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, 'Country');

    //clicar botón buscar
    const buttonElement = screen.getByRole('button', { name: 'Buscar' });
    userEvent.click(buttonElement);

    //lista de emisoras de radio que cumplan con el criterio de búsqueda
    //primera manera de renderizar de forma asíncrona
    const listElements = await screen.findAllByRole('listitem');

    expect(listElements.length).toBeGreaterThanOrEqual(1);
    //segunda manera de renderizar de forma asíncrona
    // await waitFor(()=>{
    //   expect(screen.findAllByRole('listitem')).toBeGreaterThanOrEqual(1);
    // })
  })
  test('Cuando hacemos una búsqueda inválida ("patata"), el listado debe mostrar un mensaje "No se han encontrado emisoras para esta búsqueda"',async ()=>{
    render(<App/>);
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, 'patata');
    const buttonElement = screen.getByRole('button', { name: 'Buscar' });
    userEvent.click(buttonElement);
    // const paragraphElement = await screen.findByText("No se han encontrado emisoras para esta búsqueda")
    const paragraphElement = await screen.findByLabelText('non-exist-answer')
    expect(paragraphElement).toBeInTheDocument();

  })
})