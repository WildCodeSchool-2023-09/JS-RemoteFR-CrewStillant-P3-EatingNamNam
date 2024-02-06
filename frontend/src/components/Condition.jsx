import condition from "../conditions.json";

export default function Condition() {
  return (
    <div className="bg-beige h-screen p-8">
      <h1 className="text-3xl text-center py-3 font-bold mb-4">
        {condition.title}
      </h1>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle1}</h2>
          <p className="pl-4">{condition.texte1}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle2}</h2>
          <p className="pl-4">{condition.texte2}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle3}</h2>
          <p className="pl-4">{condition.texte3}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle4}</h2>
          <p className="pl-4">{condition.texte4}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle5}</h2>
          <p className="pl-4">{condition.texte5}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle6}</h2>
          <p className="pl-4">{condition.texte6}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle7}</h2>
          <p className="pl-4">{condition.texte7}</p>
        </div>
        <div>
          <h2 className="text-xl py-2 font-semibold">{condition.subtitle8}</h2>
          <p className="pl-4">{condition.texte8}</p>
        </div>
        <p className="font-semibold text-end">{condition.date}</p>
      </div>
    </div>
  );
}
