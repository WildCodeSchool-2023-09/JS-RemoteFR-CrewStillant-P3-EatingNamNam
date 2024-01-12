import condition from "../conditions.json";

export default function Condition() {
  return (
    <div className="bg-beige">
      <div className="ml-4 pt-5">
        <h1 className="text-2xl text-center py-3 font-bold">
          {condition.title}
        </h1>
        <br />
        <p className="font-bold">{condition.date}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle1}</h2>
        <p>{condition.texte1}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle2}</h2>
        <p>{condition.texte2}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle3}</h2>
        <p>{condition.texte3}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle4}</h2>
        <p>{condition.texte4}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle5}</h2>
        <p>{condition.texte5}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle6}</h2>
        <p>{condition.texte6}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle7}</h2>
        <p>{condition.texte7}</p>
        <br />
        <h2 className="text-xl py-2 font-semibold">{condition.subtitle8}</h2>
        <p>{condition.texte8}</p>
        <br />
      </div>
    </div>
  );
}
