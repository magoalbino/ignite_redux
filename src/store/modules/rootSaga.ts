import { all } from "redux-saga/effects";

import cart from "./cart/sagas";

// esse * é um 'generator', que funciona tipo uma função async
//(então pq não usar async? não sei)
// e o 'yeld' seria o 'await'
export default function* rootSaga(): Generator {
  return yield all([cart]);
}
//Porém dessa forma não funcionou, mas com o async await funcionou:

// export default async function rootSaga() {
//   return await all([cart]);
// }
