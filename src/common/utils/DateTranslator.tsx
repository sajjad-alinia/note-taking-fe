type TDateTranslator = {
  date: string;
};

const DateTranslator = ({ date }: TDateTranslator) => {
  const translatedDate = new Date(date).toLocaleString("fa-IR");
  return <div>{translatedDate}</div>;
};

export default DateTranslator;
