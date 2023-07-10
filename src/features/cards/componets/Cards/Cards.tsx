// import {
//   useAddCardMutation,
//   useDeleteCardMutation,
//   useGetCardsQuery,
//   useUpdateCardMutation,
// } from "features/cards/service/cards.api";
import { useParams } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import {
  ArgCreateCardType,
  CardType,
} from "features/cards/service/cards.api.types";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { dividerClasses, Pagination } from "@mui/material";
import { ChangeEvent, useState } from "react";
import s from "./styles.module.css";
import { useGetCardsQuery } from "../../service/cards.api";

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
  console.log("packId: ", packId);
  const { data, error, isLoading, isError } = useGetCardsQuery(packId ?? "");
  console.log("data: ", data);

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

  if (isLoading) return <span style={{ fontSize: "50px" }}>♻</span>;
  if (isError) {
    const err = error as any;
    // const err: any = error
    return <h1>{err.data.error}</h1>;
  }
  // data? потому что изначально data is undefined
  return (
    <div>
      <h1>Cards 🃏</h1>
      {/*<div>{JSON.stringify(data)}</div>*/}
      {data?.cards.map((c, i) => {
        return <div key={i}>{c.question}</div>;
      })}
      {/*<button onClick={addCardHandler}>add card</button>*/}
      {/*<div>*/}
      {/*  {data?.cards.map((card) => {*/}
      {/*    return (*/}
      {/*      <div className={s.container} key={card._id}>*/}
      {/*        <div>*/}
      {/*          <b>Question: </b>*/}
      {/*          <p>{card.question}</p>{" "}*/}
      {/*        </div>*/}
      {/*        <div>*/}
      {/*          <b>Answer: </b>*/}
      {/*          <p>{card.answer}</p>{" "}*/}
      {/*        </div>*/}
      {/*        <button onClick={() => removeCardHandler(card)}>*/}
      {/*          delete card*/}
      {/*        </button>*/}
      {/*        <button onClick={() => updateCardHandler(card)}>*/}
      {/*          upadate card*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      {/*<Pagination count={data?.cardsTotalCount} onChange={changePageHandler} />*/}
    </div>
  );
};
