import { useEffect } from "react";
import { useActions, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import s from "./styles.module.css";
import { PackType } from "features/packs/packs.api";
import { packsSelector } from "features/packs/packs.selector";
import { useNavigate } from "react-router-dom";

export const Packs = () => {
  const cardPacks = useAppSelector(packsSelector);

  const navigate = useNavigate();

  const { fetchPacks, createPack, removePack, updatePack } =
    useActions(packsThunks);

  useEffect(() => {
    fetchPacks();
  }, []);

  const addPackHandler = () => {
    const sortColumn = {
      name: "🦁" + Math.random(),
    };
    createPack(sortColumn);
  };

  const removePackHandler = (id: string) => {
    removePack(id);
  };

  const updatePackHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random();
    updatePack({ ...pack, name: newName });
  };

  const navigateToCardsPageHandler = (packId: string) => {
    navigate(`/cards/${packId}`);
  };

  return (
    <div>
      <h1>Packs 📁</h1>
      <button onClick={addPackHandler}>add pack</button>
      <div>
        {cardPacks.map((p) => {
          return (
            <div key={p._id} className={s.container}>
              <p>
                <b>pack name</b>: {p.name}
              </p>
              <p>
                <b>cardsCount</b>: {p.cardsCount}
              </p>
              <p>
                <b>user name</b>: {p.user_name}
              </p>
              <button onClick={() => removePackHandler(p._id)}>remove</button>
              <button onClick={() => updatePackHandler(p)}>update</button>
              <button onClick={() => navigateToCardsPageHandler(p._id)}>
                на страницу карточек
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
