// import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { baseURL } from "common/api/common.api";
// import {
//   AddCardResponseType,
//   ArgCreateCardType,
//   ArgDeleteCardType,
//   ArgGetCardsType,
//   ArgUpdateCardType,
//   DeleteCardResponseType,
//   TransformFetchCardsResponseType,
//   UpdateCardResponseType,
// } from "features/cards/service/cards.api.types";

//❗1) Обязательно импорт должен быть таким, иначе будут ошибки
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AddCardResponseType,
  ArgCreateCardType,
  FetchCardsResponseType,
} from "./cards.api.types";

// ✅ 2) createApi - это функция, предоставляемая RTK Query,
// которая позволяет создать объект API для взаимодействия с внешними API и управления состоянием приложения
export const cardsApi = createApi({
  // ✅ 3)reducerPath - имя среза (slice) Redux, куда будут сохранены состояние и экшены для этого API.
  reducerPath: "cardsApi",
  // ✅ 4) baseQuery - конфигурация для HTTP клиента, который будет использоваться для отправки запросов.
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include",
  }),
  // ✅ 5) endpoints - объект, содержащий эндпоинты для этого API, описанные с помощью функций, которые будут вызываться при вызове соответствующих методов API (например, get, post, put, patch, delete). Обязательный параметр.
  endpoints: (build) => {
    return {
      // 1 параметр - тип того, что возвращает сервер (ResultType)
      // 2 параметр - тип query аргументов (QueryArg)
      getCards: build.query<FetchCardsResponseType, string>({
        query: (packId) => {
          return {
            method: "GET",
            url: "cards/card",
            params: {
              cardsPack_id: packId,
            },
          };
        },
      }),
      addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
        query: (card) => {
          return {
            method: "POST",
            url: "cards/card",
            body: {
              card,
            },
          };
        },
      }),
    };
  },
});

// ✅ 6) createApi возвращает объект API, который содержит все эндпоинты, определенные в параметре endpoints, а также набор вспомогательных функций, таких как useLazyQuery и usePrefetch.
export const { useGetCardsQuery, useAddCardMutation } = cardsApi;
// export const { useLazyGetCardsQuery } = cardsApi;
