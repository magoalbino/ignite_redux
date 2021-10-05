# Redux - Create React App

- podemos pensar no redux como um estado global da aplicação (como uma session no php?)
- As regras de negócio da aplicação devem ficar sempre no reducer, não na action.
- Debug do redux:
- - extensão do navegador 'redux DevTools'
- - instalar no projeto a biblioteca redux-devtools-extension
- - importar no store/index.ts 'composeWithDevTools' e passar como segundo parametro no método createStore

---

- utilizando json-server

---

- biblioteca immer -> diminui a verbosidade para alterar um estado respeitando o conceito de imutabilidade. Utilizando a função 'produce', pode-se fazer apenas um push no estado com os novos valores.

---

- O redux saga funciona como um middleware do redux. Nesta aplicação: quando um produto for adicionado no carrinho, antes de executar a ação de adicionar, o middleware vai buscar na api se aquela quantidadde está disponível.

---

- Podemos definir 'enums' em arquivos gerais da aplicação para funcionar como as constantes no php. Exemplo:
  "export enum ActionTypes {
  addProductToCartRequest = "ADD_PRODUCT_TO_CART_REQUEST",
  addProductToCartSuccess = "ADD_PRODUCT_TO_CART_SUCCESS",
  addProductToCartFailure = "ADD_PRODUCT_TO_CART_FAILURE",
  }"
