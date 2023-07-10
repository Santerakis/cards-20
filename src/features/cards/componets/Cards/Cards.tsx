import { useParams } from "react-router-dom";

import { ChangeEvent, useState } from "react";
import s from "./styles.module.css";
import { useLazyGetCardsQuery } from "../../service/cards.api";

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
  const [skip, setSkip] = useState(true);
  console.log("packId: ", packId);
  //потому что useParams может не найти packId и вернет undefined
  // const { data, error, isLoading, isError } = useGetCardsQuery(packId ?? "", {
  //   skip,
  // });
  const [getCards, { data, isError, isLoading, error }] = useLazyGetCardsQuery(
    {}
  );
  console.log("data: ", data);
  const fetchCardsHandler = () => {
    // setSkip(false);
    getCards(packId ?? "");
  };
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
    const err = error as any; // const err: any = error
    return <h1>{err.data.error}</h1>;
  }
  // data? потому что изначально data is undefined
  return (
    <div>
      <h1>Cards 🃏</h1>
      {/*<div>{JSON.stringify(data)}</div>*/}
      <button onClick={fetchCardsHandler}>fetch cards</button>
      {data?.cards.map((c, i) => {
        return <div key={i}>{c.question}</div>;
      })}
    </div>
  );
};
