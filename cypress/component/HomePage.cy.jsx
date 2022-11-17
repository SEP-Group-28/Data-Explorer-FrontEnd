import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import HomeView from '../../src/views/homeView/HomeView'
import {presistor, store} from "../../src/redux/store";

describe('HomePage.cy.js', () => {
  it('playground', () => {
    cy.mount(
      <Provider store={store}>
      <BrowserRouter>
      <HomeView/>
      </BrowserRouter>
      </Provider>
    )
  })
})