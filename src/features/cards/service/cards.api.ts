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
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  AddCardResponseType,
  ArgCreateCardType,
  ArgDeleteCardType,
  ArgGetCardsType,
  ArgUpdateCardType,
  DeleteCardResponseType,
  FetchCardsResponseType,
  TransformFetchCardsResponseType,
  UpdateCardResponseType,
} from "./cards.api.types";

// ✅ 2) createApi - это функция, предоставляемая RTK Query,
// которая позволяет создать объект API для взаимодействия с внешними API и управления состоянием приложения
export const cardsApi = createApi({
  // ✅ 3)reducerPath - имя среза (slice) Redux, куда будут сохранены состояние и экшены для этого API.
  reducerPath: "cardsApi",
  // ✅ 4) baseQuery - конфигурация для HTTP клиента, который будет использоваться для отправки запросов.
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: "include" }),
  tagTypes: ["Card"],
  // keepUnusedDataFor: 60,
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
  // ✅ 5) endpoints - объект, содержащий эндпоинты для этого API, описанные с помощью функций, которые будут вызываться при вызове соответствующих методов API (например, get, post, put, patch, delete). Обязательный параметр.
  endpoints: (build) => {
    return {
      // 1 параметр - тип того, что возвращает сервер (ResultType)
      // 2 параметр - тип query аргументов (QueryArg)
      getCards: build.query<TransformFetchCardsResponseType, ArgGetCardsType>({
        query: ({ packId, page, pageCount }) => {
          return {
            method: "GET",
            url: "cards/card",
            params: {
              cardsPack_id: packId,
              page,
              pageCount,
            },
          };
        },
        providesTags: ["Card"],
        transformResponse: (res: FetchCardsResponseType) => {
          return {
            cards: res.cards,
            cardsTotalCount: res.cardsTotalCount,
            isPrivatePack: res.packPrivate,
            packUserId: res.packUserId,
            packName: res.packName,
            packCreated: res.packCreated,
            packUpdated: res.packUpdated,
            page: res.page,
            pageCount: res.pageCount,
            minGrade: res.minGrade,
            maxGrade: res.maxGrade,
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
        invalidatesTags: ["Card"],
      }),
      deleteCard: build.mutation<DeleteCardResponseType, ArgDeleteCardType>({
        query: ({ packId, cardId, page, pageCount }) => {
          return {
            method: "DELETE",
            url: "cards/card",
            params: {
              id: cardId,
            },
          };
        },
        async onQueryStarted(
          // 1 параметр: QueryArg - аргументы, которые приходят в query
          { packId, cardId, page, pageCount },
          // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
          { dispatch, queryFulfilled }
        ) {
          const patchResult = dispatch(
            cardsApi.util.updateQueryData(
              // 1 параметр: endpointName, который мы выполняем после удачного первого запроса (invalidatesTags)
              "getCards",
              // 2 параметр: QueryArgFrom - параметры, которые приходят в endpoint выше
              { packId, page, pageCount },
              // 3 параметр: Коллбек функция.
              // В данном блоке мы делаем логику, которая должна выполниться синхронно,
              // без необходимости дожидаться ответа от сервера.
              // Говоря проще пишем здесь логику, которую раньше писали в редьюсере,
              // чтобы изменять стейт
              (draft) => {
                const index = draft.cards.findIndex(
                  (card) => card._id === cardId
                );
                if (index !== -1) draft.cards.splice(index, 1);
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },

        invalidatesTags: ["Card"],
      }),
      updateCard: build.mutation<UpdateCardResponseType, ArgUpdateCardType>({
        query: (card) => {
          return {
            method: "PUT",
            url: "cards/card",
            body: {
              card,
            },
          };
        },
        invalidatesTags: ["Card"],
      }),
    };
  },
});

// ✅ 6) createApi возвращает объект API, который содержит все эндпоинты, определенные в параметре endpoints, а также набор вспомогательных функций, таких как useLazyQuery и usePrefetch.
export const {
  useGetCardsQuery,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardsApi;
// export const { useLazyGetCardsQuery } = cardsApi;
