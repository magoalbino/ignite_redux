import { all, select, takeLatest } from "redux-saga/effects";
import { IState } from "../..";
import { addProductToCart } from "./actions";

//wow.. é quase uma gambiarra pro typescript funfar
type CheckProductStockRequest = ReturnType<typeof addProductToCart>;

// o reducer não espera essa função terminar para executar a ação
// os dois são feitos ao mesmo tempo
function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => (item.product.id = product.id))
        ?.quantity ?? 0
    );
  });
}

// O takeLatest cancela as requisições anteriores e pega só a última
// Imaginando que a pessoa clique várias vezes seguidas no botão fazendo várias requisições
export default all([takeLatest("ADD_PRODUCT_TO_CART", checkProductStock)]);
