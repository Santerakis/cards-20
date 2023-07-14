import { useParams } from "react-router-dom";

import { ChangeEvent, useState } from "react";
import s from "./styles.module.css";
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation,
} from "../../service/cards.api";
import { nanoid } from "@reduxjs/toolkit";
import { ArgCreateCardType, CardType } from "../../service/cards.api.types";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { AxiosError } from "axios";

type ErrorDataType = {
  error: string;
  errorObject: Object;
  in: string;
  info: string;
};

type CustomerError = {
  data: ErrorDataType;
  status: number;
};

export const Cards = () => {
  let { packId } = useParams<{ packId: string }>();
  // let packId = "dasdsad";
  const [page, setPage] = useState(1);

  console.log("packId: ", packId);
  // потому что useParams может не найти packId и вернет undefined
  const { data, error, isLoading, isError, isFetching, refetch } =
    useGetCardsQuery(
      { packId: packId ?? "", page, pageCount: 4 }

      // {
      //   selectFromResult: ({ data, error, isLoading, isError, isFetching }) => {
      //     return {
      //       cards: data?.cards,
      //       cardsTotalCount: data?.cardsTotalCount,
      //       pageCount: data?.pageCount,
      //       isLoading,
      //       isError,
      //       isFetching,
      //       error,
      //     };
      //   },
      // }
      // { pollingInterval: 3000 }
    );
  const [addCard, { isLoading: isAddLoading }] = useAddCardMutation();
  const [deleteCard, { isLoading: isDeleteLoading }] = useDeleteCardMutation();
  const [updateCard, { data: updatedCard }] = useUpdateCardMutation();

  console.log("updatedCard: ", updatedCard);

  // const [page, setPage] = useState(1);
  // const [pageCount, setPageCount] = useState(100);
  //
  // const { data, isLoading, error } = useGetCardsQuery({
  //   packId: packId ?? "",
  //   page,
  //   pageCount,
  // });
  // const [addCard] = useAddCardMutation();
  // const [deleteCard, { isLoading: isDeletedLoading }] = useDeleteCardMutation();
  // const [updateCard] = useUpdateCardMutation();
  //
  // const updateCardHandler = (card: CardType) => {
  //   const newCard = {
  //     ...card,
  //     question: "💚 new question new question 💚",
  //     answer: "🧡 new answer new answer🧡 ",
  //   };
  //   updateCard(newCard);
  // };
  // const addCardHandler = () => {
  // 	if (packId) {
  // 		const newCard: ArgCreateCardType = {
  // 			cardsPack_id: packId,
  // 			question: '🐱 question ' + nanoid(),
  // 			answer: '🐙 answer ' + nanoid(),
  // 		};
  // 		addCard(newCard).unwrap()
  // 			.then((res) => {
  // 				const cardQuestion = res.newCard.question;
  // 				toast.success(`Карточка ${cardQuestion} успешно добавлена`);
  // 			})
  // 			.catch((err) => {
  // 				toast.error(err.data.error);
  // 			})
  // 	}
  // }
  //
  // const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
  // 	setPage(page)
  // };
  //
  // const removeCardHandler = (card: CardType) => {
  // 	deleteCard({packId: card.cardsPack_id, page, pageCount, cardId: card._id})
  // };
  //
  // // if (isLoading || isDeletedLoading) {
  // // 	return <LinearProgress color={'secondary'}/>;
  // // }
  //
  // if (error) {
  // 	const err = error as any
  // 	return <h1 style={{ color: 'red' }}>{err.data.error}</h1>;
  // }

  // if (isLoading || isAddLoading || isFetching || isDeleteLoading)
  // return <span style={{ fontSize: "50px" }}>♻</span>;
  // if (isLoading) return <LinearProgress color={"secondary"} />;

  if (isError) {
    const err = error as CustomerError; // const err: any = error
    return <h1>{err.data.error}</h1>;
  }

  // if (error) {
  //   const err = error as CustomerError;
  //   if ("data" in err) {
  //     const errMsg = err.data as ErrorDataType;
  //     if ("error" in errMsg) {
  //       return <h1>{errMsg.error}</h1>;
  //     }
  //   }
  // }

  const addCardHandler = () => {
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        // question: "🚲🚲🚲 question " + nanoid(),
        // answer: "🥰🥰🥰 answer " + nanoid(),
        question: "🚲🚲🚲",
        answer: "🥰🥰🥰",
      };
      addCard(newCard)
        .unwrap()
        .then((res) => {
          const cardQuestion = res.newCard.question;
          toast.success(`Карточка ${cardQuestion} успешно добавлена`);
        })
        .catch((err) => {
          toast.error(err.data.error);
        });
    }
  };

  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    console.log("page: ", page);
    setPage(page);
  };
  const removeCardHandler = (card: CardType) => {
    deleteCard({
      cardId: card._id,
      packId: card.cardsPack_id,
      // page,
      // pageCount: 4,
    });
  };
  const updateCardHandler = (card: CardType) => {
    const newCard = {
      ...card,
      question: "💚 new question 💚",
      answer: "🧡 new answer🧡 ",
    };
    updateCard(newCard);
  };

  const count = Math.ceil(data?.cardsTotalCount! / data?.pageCount!);
  return (
    <div>
      <h1>Cards</h1>
      <button onClick={addCardHandler}>add card</button>
      <div>
        {data &&
          data.cards.map((card) => {
            return (
              <div className={s.container} key={card._id}>
                <div>
                  <b>Question: </b>
                  <p>{card.question}</p>{" "}
                </div>
                <div>
                  <b>Answer: </b>
                  <p>{card.answer}</p>{" "}
                </div>
                <button onClick={() => removeCardHandler(card)}>
                  delete card
                </button>
                <button onClick={() => updateCardHandler(card)}>
                  update card
                </button>
              </div>
            );
          })}
      </div>
      <Pagination
        // count={data && data.cardsTotalCount}
        count={count}
        onChange={changePageHandler}
        page={page}
      />
    </div>
  );
};
