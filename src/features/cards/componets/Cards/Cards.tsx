import { useParams } from "react-router-dom";

import { ChangeEvent, useState } from "react";
import s from "./styles.module.css";
import { useAddCardMutation, useGetCardsQuery } from "../../service/cards.api";
import { nanoid } from "@reduxjs/toolkit";
import { ArgCreateCardType } from "../../service/cards.api.types";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";

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
  // debugger;
  let { packId } = useParams<{ packId: string }>();
  const [page, setPage] = useState(1);

  console.log("packId: ", packId);
  // потому что useParams может не найти packId и вернет undefined
  const { data, error, isLoading, isError, refetch, isFetching } =
    useGetCardsQuery({ packId: packId ?? "", page, pageCount: 4 });
  const [addCard, { isLoading: isAddLoading }] = useAddCardMutation();

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

  if (isLoading || isAddLoading || isFetching)
    return <span style={{ fontSize: "50px" }}>♻</span>;
  if (isError) {
    const err = error as any; // const err: any = error
    return <h1>{err.data.error}</h1>;
  }

  const addCardHandler = () => {
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: "🚲🚲🚲 question " + nanoid(),
        answer: "🥰🥰🥰 answer " + nanoid(),
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
    setPage(page);
  };

  const count = Math.ceil(data!.cardsTotalCount / data!.pageCount);
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
