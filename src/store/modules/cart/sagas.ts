import { AxiosResponse } from "axios";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";
import { ActionTypes } from "./types";

//wow.. é quase uma gambiarra pro typescript funfar
type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

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

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

// O takeLatest cancela as requisições anteriores e pega só a última
// Imaginando que a pessoa clique várias vezes seguidas no botão fazendo várias requisições
export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
